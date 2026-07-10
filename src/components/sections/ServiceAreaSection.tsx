import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteConfig } from "@/content/types";

export function ServiceAreaSection({ site }: { site: SiteConfig }) {
  return (
    <section className="relative overflow-hidden bg-navy-25 py-16 sm:py-24">
      <div
        className="absolute right-0 top-0 -z-10 size-[30rem] rounded-full opacity-50 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, rgba(212,166,42,0.22), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold-500" />
            Zone d’intervention
          </span>
          <h2 className="section-title mt-4">Un électricien proche de chez vous</h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-muted">
            J’interviens à {site.address.city} et dans un rayon d’environ {site.serviceRadiusKm} km,
            notamment&nbsp;:
          </p>

          <ul className="mt-7 flex flex-wrap gap-3">
            {site.serviceAreas.map((area, i) => {
              const chipClass =
                "flex items-center gap-2 rounded-xl border border-navy-900/10 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1 hover:border-gold-500";
              return (
                <Reveal key={area.name} as="li" delay={i * 90} className="list-none">
                  {area.slug ? (
                    <Link href={`/electricien/${area.slug}`} className={chipClass}>
                      <Icon name="pin" className="size-4 text-gold-600" />
                      {area.name}
                    </Link>
                  ) : (
                    <span className={chipClass}>
                      <Icon name="pin" className="size-4 text-gold-600" />
                      {area.name}
                    </span>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </Reveal>

        {/* Carte */}
        <Reveal delay={120} className="overflow-hidden rounded-[2rem] border border-navy-900/10 bg-white p-2 shadow-[var(--shadow-soft)]">
          <iframe
            title="Zone d’intervention de HP Diff autour de Saintes"
            src="https://www.smappen.fr/app/iframe/smWDGcXFVyfrhhqy"
            className="h-[360px] w-full rounded-[1.6rem]"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
