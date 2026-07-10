import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getSiteConfig } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { IntroBlock } from "@/components/sections/IntroBlock";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ContactCta } from "@/components/sections/ContactCta";

const SLUG = "/depannage-electrique";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  return {
    title: { absolute: page!.seo.title },
    description: page!.seo.description,
    alternates: { canonical: SLUG },
  };
}

export default async function DepannagePage() {
  const [site, page] = await Promise.all([getSiteConfig(), getPage(SLUG)]);
  if (!page) notFound();

  return (
    <>
      <Hero hero={page.hero} site={site} priority />
      {page.intro && (
        <IntroBlock title={page.intro.title} body={page.intro.body} cta={page.intro.cta} tone="white" />
      )}
      {page.services && <ServicesGrid title={page.servicesTitle} services={page.services} tone="light" />}
      <ContactCta
        site={site}
        title="Une panne électrique ? Contactez-moi rapidement"
        text="Je diagnostique et répare vos installations en toute sécurité. Décrivez votre problème pour une intervention adaptée."
      />
      <ServiceAreaSection site={site} />
    </>
  );
}
