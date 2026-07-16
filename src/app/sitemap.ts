import type { MetadataRoute } from "next";
import {
  getSiteConfig,
  getAllPageSlugs,
  getCityAreas,
  getAllServiceDetails,
  getAllArticles,
} from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteConfig();
  const [slugs, cities, services, articles] = await Promise.all([
    getAllPageSlugs(),
    getCityAreas(),
    getAllServiceDetails(),
    getAllArticles(),
  ]);
  const staticPaths = ["/contact", "/mentions-legales", "/guides"];
  const cityPaths = cities.map((c) => `/electricien/${c.slug}`);
  const servicePaths = services.map((s) => `/${s.slug}`);
  const guidePaths = articles.map((a) => `/guides/${a.slug}`);

  const routes = [
    ...new Set([...slugs, ...staticPaths, ...servicePaths, ...cityPaths, ...guidePaths]),
  ];

  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority:
      path === "/"
        ? 1
        : path.startsWith("/electricien/")
          ? 0.6
          : path.startsWith("/guides/")
            ? 0.6
            : 0.8,
  }));
}
