import type { SiteConfig, FaqItem } from "@/content/types";

/**
 * Données structurées Schema.org (JSON-LD) pour le référencement local.
 * → Electrician (LocalBusiness) enrichi : geo, horaires, note agrégée,
 *   zones desservies, sameAs. + FAQPage optionnelle.
 *
 * `areaServed` peut être surchargé (pages locales par ville).
 */
export function StructuredData({
  site,
  areaServed,
  path = "/",
}: {
  site: SiteConfig;
  /** liste de villes desservies (défaut : toutes les zones) */
  areaServed?: string[];
  /** chemin de la page courante (pour @id / url) */
  path?: string;
}) {
  const url = new URL(path, site.url).toString();
  const cities = areaServed ?? site.serviceAreas.map((a) => a.name);

  const ratings = site.reviews.map((r) => r.rating).filter((r) => r > 0);
  const aggregateRating =
    ratings.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
          reviewCount: ratings.length,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url,
    telephone: site.phone.e164,
    image: `${site.url}${site.logo}`,
    logo: `${site.url}${site.logo}`,
    priceRange: "€€",
    ...(site.email ? { email: site.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: "FR",
    },
    ...(site.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } }
      : {}),
    areaServed: cities.map((name) => ({ "@type": "City", name })),
    ...(site.openingHoursSpec
      ? {
          openingHoursSpecification: site.openingHoursSpec.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days.map(
              (d) =>
                ({
                  Mo: "Monday",
                  Tu: "Tuesday",
                  We: "Wednesday",
                  Th: "Thursday",
                  Fr: "Friday",
                  Sa: "Saturday",
                  Su: "Sunday",
                })[d] ?? d,
            ),
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    ...(site.sameAs && site.sameAs.length ? { sameAs: site.sameAs } : {}),
    ...(aggregateRating ? { aggregateRating } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}

/** Schéma FAQPage — à placer sur les pages présentant une FAQ. */
export function FaqSchema({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
