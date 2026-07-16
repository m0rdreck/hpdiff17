import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getSiteConfig } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServiceLinks } from "@/components/sections/ServiceLinks";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ContactCta } from "@/components/sections/ContactCta";

const SLUG = "/electricite-generale";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  return {
    title: { absolute: page!.seo.title },
    description: page!.seo.description,
    alternates: { canonical: SLUG },
  };
}

export default async function ElectriciteGeneralePage() {
  const [site, page] = await Promise.all([getSiteConfig(), getPage(SLUG)]);
  if (!page) notFound();

  return (
    <>
      <Hero hero={page.hero} site={site} priority />
      {page.features?.map((feature, i) => (
        <FeatureSection key={feature.id} feature={feature} tone={i % 2 === 0 ? "white" : "light"} />
      ))}
      {page.services && (
        <ServicesGrid
          title={page.servicesTitle}
          intro={page.servicesIntro}
          services={page.services}
          tone="light"
        />
      )}
      <ServiceLinks
        title="Mes prestations détaillées"
        intro="Découvrez le détail de mes interventions en électricité, chacune adaptée à un besoin précis."
        tone="white"
      />
      <ContactCta
        site={site}
        title="Un projet en électricité générale ?"
        text="Installation, rénovation ou mise en conformité : confiez-moi vos travaux pour une installation fiable et durable."
      />
      <ServiceAreaSection site={site} />
    </>
  );
}
