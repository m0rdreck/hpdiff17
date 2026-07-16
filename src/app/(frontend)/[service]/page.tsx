import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllServiceDetails, getServiceDetail } from "@/lib/content";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";

/**
 * Pages de prestations (/tableau-electrique, /renovation-electrique…).
 *
 * ⚠️ Cette route vit à la RACINE du site : elle partage l'espace d'adresses
 *    avec /contact, /guides, /electricien… Next.js donne la priorité aux
 *    routes statiques, donc aucune page existante n'est menacée — mais une
 *    prestation dont le slug entrerait en collision serait INACCESSIBLE, en
 *    silence. La liste RESERVED_SLUGS (src/collections/ServiceDetails.ts)
 *    refuse ces slugs à la saisie : la tenir à jour si une nouvelle page fixe
 *    est ajoutée au site.
 */

// Une page par prestation en base ; une prestation créée ensuite est rendue
// à la demande puis mise en cache (le hook afterChange purge le cache).
export async function generateStaticParams() {
  const services = await getAllServiceDetails();
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const s = await getServiceDetail(service);
  if (!s) return {};
  return {
    title: { absolute: s.seo.title },
    description: s.seo.description,
    alternates: { canonical: s.seo.path },
  };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const s = await getServiceDetail(service);
  if (!s) notFound();
  return <ServiceDetailPage slug={service} />;
}
