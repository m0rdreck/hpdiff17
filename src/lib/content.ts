import config from "@payload-config";
import { getPayload } from "payload";
import { site } from "@/content/site";
import { pages } from "@/content/pages";
import { serviceDetails } from "@/content/services";
import type { Guide, SiteSetting } from "@/payload-types";
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
 *   • Guides          → administrés dans Payload. Voir `toArticle`.
 *   • Config du site  → administrée dans Payload (global « site-settings »),
 *                       SAUF url/logo/nav/serviceAreas. Voir `toSiteConfig`.
 *   • Pages, prestations → toujours dans les fichiers de `src/content/`.
 *
 * Les signatures ne changent pas quand une source bascule vers le CMS :
 * aucune page ni aucun composant n'a besoin d'être modifié.
 */

/** URL exploitable d'un média Payload (upload) ; "" si absent. */
function mediaUrl(v: unknown): string {
  return typeof v === "object" && v !== null && "url" in v ? ((v as { url?: string }).url ?? "") : "";
}

/** Recompose un `SiteConfig` : global Payload + parties restées en code. */
function toSiteConfig(s: SiteSetting): SiteConfig {
  return {
    // --- administré dans le back-office ---
    name: s.name,
    legalName: s.legalName,
    slogan: s.slogan,
    description: s.description,
    phone: { display: s.phone.display, e164: s.phone.e164 },
    email: s.email ?? undefined,
    address: {
      street: s.address.street,
      postalCode: s.address.postalCode,
      city: s.address.city,
      country: s.address.country,
    },
    googleMapsUrl: s.googleMapsUrl,
    sameAs: s.sameAs?.map((l) => l.url) ?? undefined,
    geo: s.geo ? { lat: s.geo.lat, lng: s.geo.lng } : undefined,
    hours: (s.hours ?? []).map(({ label, value }) => ({ label, value })),
    openingHoursSpec: s.openingHoursSpec?.map(({ days, opens, closes }) => ({
      days,
      opens,
      closes,
    })),
    serviceRadiusKm: s.serviceRadiusKm,
    trustBadges: (s.trustBadges ?? []).map((b) => ({
      icon: mediaUrl(b.icon),
      label: b.label,
      invert: b.invert ?? undefined,
    })),
    reviews: (s.reviews ?? []).map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
      date: r.date ? r.date.slice(0, 10) : undefined,
    })),
    faq: (s.faq ?? []).map(({ question, answer }) => ({ question, answer })),

    // --- volontairement NON éditables, réinjectés depuis src/content/site.ts ---
    url: site.url, // lié au déploiement
    logo: site.logo, // fichier du repo
    serviceAreas: site.serviceAreas, // bloc suivant
    nav: site.nav, // dérivé des zones + prestations
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({ slug: "site-settings", depth: 1 });
  return toSiteConfig(settings);
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
