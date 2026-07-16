/**
 * Migration unique : importe les communes de `src/content/site.ts`
 * (`serviceAreas`) dans la collection Payload « service-areas ».
 *
 * Usage : pnpm seed:areas
 *
 * Idempotent : une commune déjà présente (même nom) est ignorée, jamais
 * écrasée.
 */
import config from "@payload-config";
import { getPayload } from "payload";

import { site } from "../content/site.js";

const payload = await getPayload({ config });

for (const area of site.serviceAreas) {
  const existing = await payload.find({
    collection: "service-areas",
    where: { name: { equals: area.name } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log(`= ${area.name} (déjà en base, ignorée)`);
    continue;
  }

  await payload.create({
    collection: "service-areas",
    data: {
      name: area.name,
      slug: area.slug ?? null,
      base: area.base ?? false,
      distanceKm: area.distanceKm ?? null,
      intro: area.intro ?? null,
    },
  });
  console.log(`+ ${area.name}${area.base ? " (commune de rattachement)" : ""}`);
}

const total = await payload.count({ collection: "service-areas" });
console.log(`\nMigration terminée — ${total.totalDocs} communes en base.`);
process.exit(0);
