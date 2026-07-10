import type { SiteConfig } from "@/content/types";

/**
 * Carte Google Maps de l'adresse réelle de l'entreprise.
 * Utilise l'embed public (sans clé API).
 */
export function MapEmbed({ site, className = "" }: { site: SiteConfig; className?: string }) {
  const query = encodeURIComponent(
    `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
  );
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-navy-900/10 bg-white p-2 shadow-[var(--shadow-card)] ${className}`}>
      <iframe
        title={`Localisation de ${site.name} à ${site.address.city}`}
        src={`https://www.google.com/maps?q=${query}&hl=fr&z=14&output=embed`}
        className="h-[320px] w-full rounded-[1.6rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
