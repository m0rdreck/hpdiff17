import type { MetadataRoute } from "next";
import { getSiteConfig, getAllPageSlugs, getCityAreas, getAllServiceDetails } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteConfig();
  const [slugs, cities, services] = await Promise.all([
    getAllPageSlugs(),
    getCityAreas(),
    getAllServiceDetails(),
  ]);
  const staticPaths = ["/contact", "/mentions-legales"];
  const cityPaths = cities.map((c) => `/electricien/${c.slug}`);
  const servicePaths = services.map((s) => `/${s.slug}`);

  const routes = [...new Set([...slugs, ...staticPaths, ...servicePaths, ...cityPaths])];

  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path.startsWith("/electricien/") ? 0.6 : 0.8,
  }));
}
