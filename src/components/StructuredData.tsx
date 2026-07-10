import type { SiteConfig, FaqItem } from "@/content/types";

/**
 * Données structurées Schema.org (JSON-LD) pour le référencement.
 * → LocalBusiness (Electrician) + FAQ optionnelle.
 */
export function StructuredData({ site, faq }: { site: SiteConfig; faq?: FaqItem[] }) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    image: `${site.url}${site.logo}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: "FR",
    },
    areaServed: site.serviceAreas.map((a) => a.name),
    priceRange: "€€",
    ...(site.email ? { email: site.email } : {}),
  };

  const faqSchema =
    faq && faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
