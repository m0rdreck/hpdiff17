import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteConfig } from "@/content/types";

export function ContactCta({
  site,
  title = "Contactez votre électricien à Saintes",
  text = "N’hésitez pas à me contacter pour bénéficier d’une intervention adaptée à vos besoins ou pour obtenir plus de renseignements sur mes prestations.",
}: {
  site: SiteConfig;
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <Reveal
          className="relative overflow-hidden rounded-[2.2rem] px-8 py-14 shadow-[var(--shadow-soft)] sm:px-14"
          as="div"
        >
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "linear-gradient(120deg, #15174a 0%, #1c1f57 55%, #23276b 100%)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full opacity-40 blur-2xl animate-float-slow"
            style={{ background: "radial-gradient(circle, var(--color-gold-500), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 bg-grid opacity-[0.12]" aria-hidden="true" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="eyebrow text-gold-400">
                <span className="h-px w-8 bg-gold-500" />
                Contact
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/80">{text}</p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <Button
                cta={{
                  label: "Demander une intervention",
                  href: "/contact",
                  variant: "ghost",
                  icon: "arrow",
                }}
              />
              <a
                href={`tel:${site.phone.e164}`}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-gold-400"
              >
                <Icon name="phone" className="size-4 text-gold-400" />
                {site.phone.display}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
