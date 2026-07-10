import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Hero as HeroContent, SiteConfig } from "@/content/types";

export function Hero({
  hero,
  site,
  priority = false,
}: {
  hero: HeroContent;
  site: SiteConfig;
  priority?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-25">
      {/* Fond décoratif clair : grille + halos animés */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-32 -top-24 -z-10 size-[34rem] rounded-full opacity-60 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, rgba(212,166,42,0.28), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 right-0 -z-10 size-[38rem] rounded-full opacity-60 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, rgba(21,23,74,0.18), transparent 65%)", animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        {/* Texte */}
        <div className="max-w-xl">
          {hero.eyebrow && (
            <span className="eyebrow animate-fade-up" style={{ animationDelay: "0.05s" }}>
              <span className="h-px w-8 bg-gold-500" />
              {hero.eyebrow}
            </span>
          )}
          <h1
            className="mt-5 animate-fade-up font-display text-4xl font-semibold leading-[1.06] text-navy-900 sm:text-5xl lg:text-[3.5rem]"
            style={{ animationDelay: "0.12s" }}
          >
            {hero.title}{" "}
            {hero.highlight && <span className="text-gradient-gold">{hero.highlight}</span>}
          </h1>
          <p
            className="mt-6 max-w-lg animate-fade-up text-base leading-8 text-muted"
            style={{ animationDelay: "0.2s" }}
          >
            {hero.text}
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap gap-4" style={{ animationDelay: "0.28s" }}>
            {hero.ctas.map((cta) => (
              <Button key={cta.label} cta={cta} />
            ))}
          </div>

          {/* Réassurance : coordonnées (info existante) */}
          <div
            className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-900"
            style={{ animationDelay: "0.36s" }}
          >
            <a href={`tel:${site.phone.e164}`} className="flex items-center gap-2 font-semibold hover:text-gold-600">
              <span className="relative flex size-9 items-center justify-center rounded-full bg-gold-500 text-navy-950 animate-pulse-ring">
                <Icon name="phone" className="size-4" />
              </span>
              {site.phone.display}
            </a>
            <span className="flex items-center gap-2 text-muted">
              <Icon name="pin" className="size-4 text-gold-600" />
              {site.address.city} · {site.serviceRadiusKm} km alentour
            </span>
          </div>
        </div>

        {/* Visuel */}
        <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {/* anneau tournant décoratif */}
          <div
            className="absolute -right-6 -top-6 -z-10 size-32 rounded-full border border-dashed border-gold-400/50 animate-spin-slow"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)] ring-1 ring-navy-900/5">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              width={900}
              height={1000}
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-[26rem] w-full object-cover sm:h-[32rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/25 to-transparent" />
          </div>

          {/* Badge flottant : expérience (info existante) */}
          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-navy-900/8 bg-white/95 px-5 py-4 shadow-[var(--shadow-card)] backdrop-blur animate-float-badge sm:-left-6">
            <span className="font-display text-3xl font-bold text-gold-500">15+</span>
            <span className="text-xs font-medium leading-tight text-navy-900">
              ans
              <br />
              d’expérience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
