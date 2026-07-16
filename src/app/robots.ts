import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/content";

/**
 * ⚠️ Ce fichier doit rester à la RACINE de `src/app/`.
 *    Placé dans le groupe de routes `(frontend)`, Next ne génère plus
 *    /robots.txt — silencieusement, sans erreur ni avertissement au build
 *    (contrairement à sitemap.ts, qui lui fonctionne dans un groupe).
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteConfig();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
