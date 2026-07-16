import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { fr } from "@payloadcms/translations/languages/fr";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Guides } from "@/collections/Guides";
import { Media } from "@/collections/Media";
import { Users } from "@/collections/Users";

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
  collections: [Guides, Media, Users],
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
  }),
  // Payload type `sharp` d'après la 0.32.x ; on installe la 0.35.x (seule à
  // fournir des binaires pour Node 24). L'API consommée par Payload est
  // identique entre les deux — l'écart est purement au niveau des types.
  sharp: sharp as unknown as Parameters<typeof buildConfig>[0]["sharp"],
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
