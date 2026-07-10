import type { MetadataRoute } from "next";
import { getSiteConfig, getAllPageSlugs, getCityAreas } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteConfig();
  const [slugs, cities] = await Promise.all([getAllPageSlugs(), getCityAreas()]);
  const staticPaths = ["/contact", "/mentions-legales"];
  const cityPaths = cities.map((c) => `/electricien/${c.slug}`);

  const routes = [...new Set([...slugs, ...staticPaths, ...cityPaths])];

  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path.startsWith("/electricien/") ? 0.6 : 0.7,
  }));
}
