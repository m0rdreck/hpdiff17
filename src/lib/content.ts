import config from "@payload-config";
import { getPayload } from "payload";
import { site } from "@/content/site";
import { pages } from "@/content/pages";
import { serviceDetails } from "@/content/services";
import type { Guide } from "@/payload-types";
import type {
  Article,
  ArticleBlock,
  Page,
  ServiceArea,
  ServiceDetail,
  SiteConfig,
} from "@/content/types";

/**
 * Couche d'accès au contenu — seul point de contact entre le site et ses
 * sources de données.
 *
 * État actuel :
 *   • Guides  → administrés dans Payload (base Neon). Voir `toArticle`.
 *   • Le reste (config du site, pages, prestations, zones d'intervention)
 *     → toujours dans les fichiers TypeScript de `src/content/`.
 *
 * Les signatures ne changent pas quand une source bascule vers le CMS :
 * aucune page ni aucun composant n'a besoin d'être modifié. C'est ce qui a
 * permis de passer les guides sous Payload sans toucher à `/guides`.
 */

export async function getSiteConfig(): Promise<SiteConfig> {
  return site;
}

export async function getPage(slug: string): Promise<Page | null> {
  return pages[slug] ?? null;
}

export async function getAllPageSlugs(): Promise<string[]> {
  return Object.keys(pages);
}

/** Villes disposant d'une page locale (celles ayant un `slug`). */
export async function getCityAreas(): Promise<ServiceArea[]> {
  return site.serviceAreas.filter((a) => a.slug);
}

export async function getCityBySlug(slug: string): Promise<ServiceArea | null> {
  return site.serviceAreas.find((a) => a.slug === slug) ?? null;
}

/** Pages de service détaillées. */
export async function getServiceDetail(slug: string): Promise<ServiceDetail | null> {
  return serviceDetails[slug] ?? null;
}

export async function getAllServiceDetails(): Promise<ServiceDetail[]> {
  return Object.values(serviceDetails);
}

/* ------------------------------------------------------------------ *
 * Guides — administrés depuis le back-office Payload (/admin).
 *
 * Seules ces fonctions parlent à Payload : les pages et composants
 * continuent de consommer le type `Article` sans rien savoir du CMS.
 * ------------------------------------------------------------------ */

/** Traduit un document Payload `guides` en `Article`. */
function toArticle(doc: Guide): Article {
  const image = typeof doc.image === "object" && doc.image !== null ? doc.image : null;

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    readingMinutes: doc.readingMinutes,
    // Payload renvoie un ISO complet ; le type `Article` attend "AAAA-MM-JJ".
    updated: (doc.updated ?? "").slice(0, 10),
    image: image?.url ?? "",
    imageAlt: image?.alt ?? doc.title,
    body: (doc.body ?? []).map((block): ArticleBlock => {
      switch (block.blockType) {
        case "h2":
          return { type: "h2", text: block.text };
        case "ul":
          return { type: "ul", items: (block.items ?? []).map((i) => i.text) };
        case "callout":
          return { type: "callout", text: block.text };
        default:
          return { type: "p", text: block.text };
      }
    }),
    relatedServices: doc.relatedServices ?? undefined,
    faq: doc.faq?.map(({ question, answer }) => ({ question, answer })) ?? undefined,
    seo: {
      title: doc.seo.title,
      description: doc.seo.description,
      path: `/guides/${doc.slug}`,
    },
  };
}

/** Articles de la section « Guides & conseils », dans l'ordre d'affichage. */
export async function getAllArticles(): Promise<Article[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "guides",
    // Les brouillons ne doivent jamais fuiter sur le site public.
    where: { _status: { equals: "published" } },
    sort: "order",
    depth: 1,
    limit: 100,
    overrideAccess: false,
  });
  return docs.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "guides",
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
    depth: 1,
    limit: 1,
    overrideAccess: false,
  });
  return docs[0] ? toArticle(docs[0]) : null;
}
