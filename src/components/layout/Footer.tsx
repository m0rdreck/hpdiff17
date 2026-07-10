import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { SiteConfig } from "@/content/types";

export function Footer({ site }: { site: SiteConfig }) {
  const year = 2026;
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        {/* Marque */}
        <div>
          <Image
            src={site.logo}
            alt={site.name}
            width={130}
            height={125}
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.description}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.googleMapsUrl}
              target="_blank"
              rel="noreferrer nofollow"
              aria-label="Fiche Google de HP Diff"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-500 hover:text-gold-400"
            >
              <Icon name="map" className="size-5" />
            </a>
            <a
              href={`tel:${site.phone.e164}`}
              aria-label="Appeler HP Diff"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-500 hover:text-gold-400"
            >
              <Icon name="phone" className="size-5" />
            </a>
          </div>
        </div>

        {/* Plan du site + zones */}
        <nav aria-label="Plan du site">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Plan du site</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {site.serviceAreas.some((a) => a.slug) && (
            <>
              <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-white">
                Zones d’intervention
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {site.serviceAreas
                  .filter((a) => a.slug)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link href={`/electricien/${a.slug}`} className="transition-colors hover:text-gold-400">
                        Électricien à {a.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </nav>

        {/* Coordonnées */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </span>
            </li>
            <li>
              <a href={`tel:${site.phone.e164}`} className="flex items-center gap-3 hover:text-gold-400">
                <Icon name="phone" className="size-4 shrink-0 text-gold-400" />
                {site.phone.display}
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold-400">
                  <Icon name="mail" className="size-4 shrink-0 text-gold-400" />
                  {site.email}
                </a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>{site.hours[1]?.value}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/55 md:flex-row">
          <p>© {year} {site.legalName}. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <Link href="/mentions-legales#confidentialite" className="hover:text-white">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
