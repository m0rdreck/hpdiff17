import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteConfig, getCityAreas, getCityBySlug, getPage } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { IntroBlock } from "@/components/sections/IntroBlock";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServiceLinks } from "@/components/sections/ServiceLinks";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { FaqSchema, BreadcrumbSchema } from "@/components/StructuredData";
import type { Hero as HeroContent } from "@/content/types";

// Génère une page statique par commune disposant d'un slug.
export async function generateStaticParams() {
  const cities = await getCityAreas();
  return cities.map((c) => ({ ville: c.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville } = await params;
  const area = await getCityBySlug(ville);
  if (!area) return {};
  const path = `/electricien/${area.slug}`;
  return {
    title: {
      absolute: `Électricien à ${area.name} | Dépannage & électricité générale — HP Diff`,
    },
    description: `HP Diff, votre électricien à ${area.name} (près de Saintes) : installation, rénovation, mise aux normes et dépannage électrique. Intervention rapide, devis gratuit.`,
    alternates: { canonical: path },
  };
}

export default async function VillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const [site, area, home] = await Promise.all([
    getSiteConfig(),
    getCityBySlug(ville),
    getPage("/"),
  ]);
  if (!area || !area.slug) notFound();

  const hero: HeroContent = {
    eyebrow: `Électricité générale · ${area.name}`,
    title: "Électricien à",
    highlight: area.name,
    text: `${area.intro ?? `J’interviens à ${area.name} pour tous vos travaux d’électricité.`} Installation, rénovation, mise aux normes ou dépannage : je réponds rapidement à vos besoins.`,
    image: "/images/hero.webp",
    imageAlt: `Électricien à ${area.name}`,
    ctas: [
      { label: "Appelez votre électricien", href: `tel:${site.phone.e164}`, variant: "primary", icon: "phone" },
      { label: "Demandez votre devis", href: "/contact", variant: "outline", icon: "arrow" },
    ],
  };

  const introBody = `Basé à Saintes, à environ ${area.distanceKm} km de ${area.name}, j’interviens rapidement dans votre commune et ses environs. Fort de plus de 15 ans d’expérience, j’assure des installations fiables, conformes aux normes en vigueur et adaptées à vos besoins, que vous soyez un particulier ou un professionnel.`;

  return (
    <>
      <FaqSchema items={site.faq} />
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Accueil", path: "/" },
          { name: `Électricien à ${area.name}`, path: `/electricien/${area.slug}` },
        ]}
      />
      <Hero hero={hero} site={site} priority />
      <TrustBadges badges={site.trustBadges} />

      <IntroBlock
        title={`Votre électricien à ${area.name} et ses alentours`}
        body={introBody}
        tone="white"
        cta={{ label: "Confiez-moi vos travaux", href: "/contact", variant: "primary", icon: "arrow" }}
      />

      {home?.services && (
        <ServicesGrid
          title={`Mes prestations d’électricité à ${area.name}`}
          intro={`Spécialiste en électricité générale, j’interviens à ${area.name} pour installer, rénover ou mettre en conformité vos circuits électriques.`}
          services={home.services}
          tone="light"
        />
      )}

      <ServiceLinks
        title={`Mes prestations détaillées à ${area.name}`}
        intro="Découvrez le détail de mes interventions en électricité, chacune adaptée à un besoin précis."
        tone="white"
      />

      <ContactCta
        site={site}
        title={`Besoin d’un électricien à ${area.name} ?`}
        text={`Contactez-moi pour une intervention adaptée à vos besoins à ${area.name} ou pour obtenir un devis gratuit.`}
      />

      <ServiceAreaSection site={site} />

      <section className="bg-navy-25 py-16 sm:py-24">
        <Reveal className="container-page max-w-3xl">
          <Faq items={site.faq} />
        </Reveal>
      </section>
    </>
  );
}
