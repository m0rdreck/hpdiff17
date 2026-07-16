/**
 * Migration unique : importe les 4 guides de `src/content/articles.ts`
 * dans la base Payload.
 *
 * Usage : pnpm seed:guides
 *
 * Idempotent : un guide dont le slug existe déjà est ignoré (pas écrasé),
 * pour ne jamais détruire une modification faite depuis le back-office.
 * `src/content/articles.ts` reste la source de cette migration ; une fois
 * les guides en base, c'est le back-office qui fait foi.
 */
import path from "path";
import { fileURLToPath } from "url";

import config from "@payload-config";
import { getPayload } from "payload";

import { articles, articleOrder } from "../content/articles.js";
import type { ArticleBlock } from "../content/types.js";
import type { Guide } from "../payload-types.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../public");

/** Traduit un bloc `Article` vers sa forme Payload (`blockType` + champs). */
function toPayloadBlock(block: ArticleBlock) {
  switch (block.type) {
    case "h2":
      return { blockType: "h2" as const, text: block.text };
    case "ul":
      return { blockType: "ul" as const, items: block.items.map((text) => ({ text })) };
    case "callout":
      return { blockType: "callout" as const, text: block.text };
    default:
      return { blockType: "p" as const, text: block.text };
  }
}

async function seed() {
  const payload = await getPayload({ config });

  // Les images du repo sont partagées entre plusieurs guides → on ne les
  // téléverse qu'une fois chacune.
  const mediaCache = new Map<string, number>();

  async function uploadImage(imagePath: string, alt: string): Promise<number> {
    const cached = mediaCache.get(imagePath);
    if (cached) return cached;

    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: path.basename(imagePath) } },
      limit: 1,
    });

    if (existing.docs[0]) {
      mediaCache.set(imagePath, existing.docs[0].id);
      return existing.docs[0].id;
    }

    const created = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.join(publicDir, imagePath),
    });
    console.log(`  ↑ image téléversée : ${imagePath}`);
    mediaCache.set(imagePath, created.id);
    return created.id;
  }

  for (const [index, slug] of articleOrder.entries()) {
    const article = articles[slug];
    if (!article) continue;

    const already = await payload.find({
      collection: "guides",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (already.docs.length > 0) {
      console.log(`= ${slug} (déjà en base, ignoré)`);
      continue;
    }

    const imageId = await uploadImage(article.image, article.imageAlt);

    await payload.create({
      collection: "guides",
      data: {
        title: article.title,
        slug: article.slug,
        order: (index + 1) * 10,
        category: article.category as "Sécurité" | "Budget" | "Rénovation" | "Dépannage",
        readingMinutes: article.readingMinutes,
        updated: new Date(article.updated).toISOString(),
        excerpt: article.excerpt,
        image: imageId,
        body: article.body.map(toPayloadBlock),
        relatedServices: (article.relatedServices ?? []) as Guide["relatedServices"],
        faq: article.faq ?? [],
        seo: { title: article.seo.title, description: article.seo.description },
        _status: "published",
      },
    });
    console.log(`+ ${slug}`);
  }

  console.log("\nMigration terminée.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
