/**
 * Migration unique : importe les prestations de `src/content/services.ts`
 * dans la collection Payload « service-details ».
 *
 * Usage : pnpm seed:services
 *
 * À lancer AVANT `seed:guides` : les guides référencent les prestations par
 * relation (donc par ID), pas par slug.
 *
 * Deux passes, car `related` est une relation croisée : on ne peut pas lier
 * une prestation qui n'existe pas encore.
 *   1. création de toutes les prestations, sans les liens ;
 *   2. résolution des liens une fois tous les ID connus.
 *
 * Idempotent : une prestation déjà présente (même slug) est ignorée.
 */
import path from "path";
import { fileURLToPath } from "url";

import config from "@payload-config";
import { getPayload } from "payload";

import { serviceDetails } from "../content/services.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../public");

const payload = await getPayload({ config });

/** Téléverse une image et renvoie son id (réutilise si déjà présente). */
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

const services = Object.values(serviceDetails);
const idBySlug = new Map<string, number>();

// --- Passe 1 : création sans les liens ---
for (const [index, s] of services.entries()) {
  const existing = await payload.find({
    collection: "service-details",
    where: { slug: { equals: s.slug } },
    limit: 1,
  });

  if (existing.docs[0]) {
    console.log(`= ${s.slug} (déjà en base, ignorée)`);
    idBySlug.set(s.slug, existing.docs[0].id);
    continue;
  }

  const imageId = await uploadImage(s.hero.image, s.hero.imageAlt);

  const created = await payload.create({
    collection: "service-details",
    data: {
      // Le libellé de menu reprend le titre du bandeau, comme le faisait le
      // code : « Tableau » + « électrique ».
      navLabel: `${s.hero.title} ${s.hero.highlight ?? ""}`.trim(),
      slug: s.slug,
      order: (index + 1) * 10,
      hero: {
        eyebrow: s.hero.eyebrow ?? null,
        title: s.hero.title,
        highlight: s.hero.highlight ?? null,
        text: s.hero.text,
        image: imageId,
      },
      intro: s.intro,
      benefits: s.benefits,
      steps: s.steps ?? [],
      seo: { title: s.seo.title, description: s.seo.description },
    },
  });
  idBySlug.set(s.slug, created.id);
  console.log(`+ ${s.slug}`);
}

// --- Passe 2 : liens entre prestations ---
for (const s of services) {
  if (!s.related?.length) continue;
  const id = idBySlug.get(s.slug);
  if (!id) continue;

  const relatedIds = s.related.map((slug) => idBySlug.get(slug)).filter((v): v is number => !!v);
  if (relatedIds.length !== s.related.length) {
    console.warn(`  ⚠️ ${s.slug} : certaines prestations liées sont introuvables`);
  }

  await payload.update({
    collection: "service-details",
    id,
    data: { related: relatedIds },
  });
  console.log(`  ↔ ${s.slug} → ${relatedIds.length} prestation(s) liée(s)`);
}

const total = await payload.count({ collection: "service-details" });
console.log(`\nMigration terminée — ${total.totalDocs} prestations en base.`);
process.exit(0);
