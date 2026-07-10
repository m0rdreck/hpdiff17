import type { MetadataRoute } from "next";
import { getSiteConfig, getAllPageSlugs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteConfig();
  const slugs = await getAllPageSlugs();
  const staticPaths = ["/contact", "/mentions-legales"];

  const routes = [...new Set([...slugs, ...staticPaths])];

  return routes.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
