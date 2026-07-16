import type { Metadata } from "next";
import { getPage, getSiteConfig } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServiceLinks } from "@/components/sections/ServiceLinks";
import { GuidesTeaser } from "@/components/sections/GuidesTeaser";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { getAllArticles } from "@/lib/content";
import { FaqSchema } from "@/components/StructuredData";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("/");
  return {
    title: { absolute: page!.seo.title },
    description: page!.seo.description,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [site, page, articles] = await Promise.all([
    getSiteConfig(),
    getPage("/"),
    getAllArticles(),
  ]);
  if (!page) return null;

  const [depannageFeature, quiSuisJe] = page.features ?? [];

  return (
    <>
      <FaqSchema items={site.faq} />
      <Hero hero={page.hero} site={site} priority />
      <TrustBadges badges={site.trustBadges} />

      {depannageFeature && <FeatureSection feature={depannageFeature} tone="white" />}

      <ServicesGrid
        title={page.servicesTitle}
        intro={page.servicesIntro}
        services={page.services ?? []}
        tone="light"
      />

      <ServiceLinks
        title="Mes prestations détaillées"
        intro="Découvrez le détail de mes interventions en électricité, chacune adaptée à un besoin précis."
        tone="white"
      />

      {quiSuisJe && <FeatureSection feature={quiSuisJe} tone="light" />}

      <GuidesTeaser articles={articles} tone="white" />

      <Reviews reviews={site.reviews} />
      <ServiceAreaSection site={site} />
      <ContactCta site={site} />

      <section className="bg-navy-25 py-16 sm:py-24">
        <Reveal className="container-page max-w-3xl">
          <Faq items={site.faq} />
        </Reveal>
      </section>
    </>
  );
}
