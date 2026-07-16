import { site } from "@/content/site";
import { pages } from "@/content/pages";
import { serviceDetails } from "@/content/services";
import { articles, articleOrder } from "@/content/articles";
import type { Article, Page, ServiceArea, ServiceDetail, SiteConfig } from "@/content/types";

/**
 * Couche d'accès au contenu.
 *
 * ⇢ C'EST ICI que se fera le passage à un back-office / CMS.
 *   Aujourd'hui ces fonctions lisent des fichiers TypeScript statiques.
 *   Demain, il suffira de réécrire leur corps pour appeler une API, une
 *   base de données (Prisma, Supabase…) ou un CMS headless (Sanity,
 *   Strapi, Payload…) — la signature reste identique, donc AUCUN composant
 *   ni AUCUNE page n'aura besoin d'être modifié.
 *
 *   Elles sont volontairement `async` pour anticiper ce futur appel réseau.
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

/** Articles de la section « Guides & conseils », dans l'ordre d'affichage. */
export async function getAllArticles(): Promise<Article[]> {
  return articleOrder.map((slug) => articles[slug]).filter(Boolean);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return articles[slug] ?? null;
}
