/**
 * Migration unique : importe les pages principales de `src/content/pages.ts`
 * (accueil, dépannage, électricité générale) dans la collection « pages ».
 *
 * Usage : pnpm seed:pages
 *
 * Idempotent : une page déjà présente (même slug) est ignorée.
 *
 * La collection interdit la création via l'admin (ces pages sont adossées à
 * des routes fixes) : le script passe donc par `overrideAccess`.
 */
import path from "path";
import { fileURLToPath } from "url";

import config from "@payload-config";
import { getPayload } from "payload";

import { pages } from "../content/pages.js";
import type { Cta } from "../content/types.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../public");

const payload = await getPayload({ config });

/** Nom lisible de la page, pour le back-office. */
const TITLES: Record<string, string> = {
  "/": "Accueil",
  "/depannage-electrique": "Dépannage électrique",
  "/electricite-generale": "Électricité générale",
};

async function uploadImage(imagePath: string, alt: string): Promise<number> {
  const filename = path.basename(imagePath);
  const found = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (found.docs[0]) return found.docs[0].id;

  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(publicDir, imagePath),
  });
  console.log(`  ↑ image téléversée : ${imagePath}`);
  return created.id;
}

/**
 * Le back-office ne stocke qu'un libellé + une destination : on retrouve la
 * destination depuis l'ancien href codé en dur.
 */
function toCta(c: Cta) {
  return {
    label: c.label,
    target: c.href.startsWith("tel:") ? ("phone" as const) : ("contact" as const),
  };
}

for (const page of Object.values(pages)) {
  const existing = await payload.find({
    collection: "pages",
    where: { slug: { equals: page.slug } },
    limit: 1,
  });

  if (existing.docs[0]) {
    console.log(`= ${page.slug} (déjà en base, ignorée)`);
    continue;
  }

  const heroImage = await uploadImage(page.hero.image, page.hero.imageAlt);

  const features = [];
  for (const f of page.features ?? []) {
    features.push({
      title: f.title,
      body: f.body,
      image: await uploadImage(f.image, f.imageAlt),
      imageSide: f.imageSide ?? "left",
      ctaLabel: f.cta?.label ?? null,
      ctaHref: f.cta?.href ?? null,
    });
  }

  const services = [];
  for (const s of page.services ?? []) {
    services.push({
      title: s.title,
      description: s.description,
      image: await uploadImage(s.image, s.imageAlt),
    });
  }

  await payload.create({
    collection: "pages",
    overrideAccess: true, // `create` est fermé pour l'admin, pas pour ce script
    data: {
      title: TITLES[page.slug] ?? page.slug,
      slug: page.slug,
      hero: {
        eyebrow: page.hero.eyebrow ?? null,
        title: page.hero.title,
        highlight: page.hero.highlight ?? null,
        text: page.hero.text,
        image: heroImage,
        ctas: page.hero.ctas.map(toCta),
      },
      intro: page.intro ? { title: page.intro.title, body: page.intro.body } : {},
      features,
      servicesTitle: page.servicesTitle ?? null,
      servicesIntro: page.servicesIntro ?? null,
      services,
      seo: { title: page.seo.title, description: page.seo.description },
    },
  });
  console.log(`+ ${page.slug}`);
}

const total = await payload.count({ collection: "pages" });
console.log(`\nMigration terminée — ${total.totalDocs} pages en base.`);
process.exit(0);
