import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { fr } from "@payloadcms/translations/languages/fr";
import { buildConfig } from "payload";

import { Guides } from "@/collections/Guides";
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { ServiceAreas } from "@/collections/ServiceAreas";
import { ServiceDetails } from "@/collections/ServiceDetails";
import { Users } from "@/collections/Users";
import { SiteSettings } from "@/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Configuration du back-office.
 *
 * Le contenu éditable vit en base (Neon Postgres) ; le site le lit via
 * `src/lib/content.ts`, qui reste le seul point de contact entre le CMS et
 * les pages.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— HP Diff",
    },
  },
  collections: [Pages, ServiceDetails, Guides, ServiceAreas, Media, Users],
  globals: [SiteSettings],
  // Back-office en français (Eric est l'éditeur principal).
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: "fr",
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    // Le schéma n'évolue QUE par migrations (`src/migrations/`), jamais par
    // « push » automatique. Sans ça, tout script lancé sans
    // NODE_ENV=production (un seed, par exemple) pousserait ses différences
    // de schéma dans la base visée — y compris la PRODUCTION — et y
    // inscrirait un marqueur `dev` qui fait ensuite poser une question
    // interactive à `payload migrate`, bloquant le build.
    push: false,
  }),
  // ⚠️ PAS de `sharp` ici, volontairement.
  //    Ses binaires natifs (libvips) vivent derrière les liens symboliques du
  //    store pnpm, que le tracing de fichiers de Vercel ne suit pas : l'admin
  //    tombait en 500 (« Could not load the sharp module ») en production.
  //    Payload ne s'en sert que pour les vignettes et les métadonnées d'image,
  //    dont on n'a pas l'usage : aucun `imageSizes` n'est déclaré sur Media, et
  //    les guides affichent leurs images en `fill` — c'est l'optimiseur de
  //    Vercel qui les redimensionne à la livraison.
  //    Conséquence assumée : les images sont stockées telles quelles sur Blob,
  //    sans redimensionnement à l'upload. Pour y revenir, il faudra régler le
  //    tracing des binaires (ou passer node-linker=hoisted).
  plugins: [
    // Les images uploadées partent sur Vercel Blob plutôt que sur le disque
    // de la fonction (éphémère et non partagé entre instances).
    // En local, sans token, on retombe sur le disque (dossier ./media).
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { [Media.slug]: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
