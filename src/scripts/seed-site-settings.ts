/**
 * Migration unique : recopie la configuration de `src/content/site.ts` dans
 * le global Payload « site-settings ».
 *
 * Usage : pnpm seed:site
 *
 * Idempotent : si le global est déjà rempli (champ `name` présent), on ne
 * touche à rien — une modification faite depuis le back-office ne doit jamais
 * être écrasée par un rejeu du script.
 */
import path from "path";
import { fileURLToPath } from "url";

import config from "@payload-config";
import { getPayload } from "payload";

import { site } from "../content/site.js";
import type { SiteSetting } from "../payload-types.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../public");

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  if (existing?.name) {
    console.log("= site-settings déjà renseigné → aucune modification.");
    process.exit(0);
  }

  /** Téléverse une icône de badge et renvoie son id (réutilise si déjà là). */
  async function uploadIcon(imagePath: string, alt: string): Promise<number> {
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
    console.log(`  ↑ icône téléversée : ${imagePath}`);
    return created.id;
  }

  const trustBadges = [];
  for (const b of site.trustBadges) {
    trustBadges.push({
      icon: await uploadIcon(b.icon, b.label),
      label: b.label,
      invert: b.invert ?? false,
    });
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      name: site.name,
      legalName: site.legalName,
      slogan: site.slogan,
      description: site.description,
      phone: site.phone,
      email: site.email,
      address: site.address,
      googleMapsUrl: site.googleMapsUrl,
      sameAs: (site.sameAs ?? []).map((url) => ({ url })),
      geo: site.geo,
      hours: site.hours,
      // `days` est typé string[] côté site.ts, union fermée côté Payload.
      openingHoursSpec: site.openingHoursSpec as SiteSetting["openingHoursSpec"],
      serviceRadiusKm: site.serviceRadiusKm,
      trustBadges,
      reviews: site.reviews.map((r) => ({
        ...r,
        date: r.date ? new Date(r.date).toISOString() : undefined,
      })),
      faq: site.faq,
    },
  });

  console.log("+ site-settings renseigné.");
  console.log("\nMigration terminée.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
