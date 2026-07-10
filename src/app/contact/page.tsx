import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/content";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Contact — Électricien à Saintes",
  description:
    "Contactez HP Diff, votre électricien à Saintes, pour un dépannage, une installation ou un devis gratuit. Réponse rapide.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const site = await getSiteConfig();

  return (
    <>
      {/* En-tête */}
      <section className="relative overflow-hidden bg-navy-25 pb-14 pt-16 sm:pb-16 sm:pt-20">
        <div className="absolute inset-0 -z-10 bg-grid opacity-70" aria-hidden="true" />
        <div
          className="absolute -top-24 left-1/2 -z-10 size-[32rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl animate-float-slow"
          style={{ background: "radial-gradient(circle, rgba(212,166,42,0.22), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="container-page max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-500" />
            Contact
          </span>
          <h1 className="mt-4 animate-fade-up font-display text-4xl font-semibold text-navy-900 sm:text-5xl">
            Contactez votre <span className="text-gradient-gold">électricien</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl animate-fade-up text-base leading-8 text-muted" style={{ animationDelay: "0.15s" }}>
            Une question, un dépannage ou une demande de devis ? Décrivez-moi votre besoin, je vous
            réponds dans les plus brefs délais.
          </p>
        </div>
      </section>

      {/* Coordonnées + formulaire */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* Infos */}
          <div>
            <h2 className="section-title">Mes coordonnées</h2>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon name="phone" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted">Téléphone</p>
                  <a href={`tel:${site.phone.e164}`} className="font-display text-lg text-navy-900 hover:text-gold-600">
                    {site.phone.display}
                  </a>
                </div>
              </li>
              {site.email && (
                <li className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                    <Icon name="mail" className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted">E-mail</p>
                    <a href={`mailto:${site.email}`} className="font-display text-lg text-navy-900 hover:text-gold-600">
                      {site.email}
                    </a>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon name="pin" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted">Adresse</p>
                  <p className="font-display text-lg text-navy-900">
                    {site.address.street}, {site.address.postalCode} {site.address.city}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon name="clock" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted">Horaires</p>
                  <ul className="mt-1 space-y-1">
                    {site.hours.map((h) => (
                      <li key={h.label} className="text-sm text-ink">
                        <span className="font-medium text-navy-900">{h.label} :</span> {h.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <a
              href={site.googleMapsUrl}
              target="_blank"
              rel="noreferrer nofollow"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-600"
            >
              <Icon name="map" className="size-4" />
              Voir sur Google Maps
            </a>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="section-title mb-6">Envoyez-moi un message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
