import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales & confidentialité",
  description: "Mentions légales, conditions d’utilisation et politique de confidentialité du site HP Diff.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default async function MentionsLegalesPage() {
  const site = await getSiteConfig();

  return (
    <div className="bg-white py-16 sm:py-20">
      <article className="container-page max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          Mentions légales
        </h1>

        <div className="prose-content mt-8 space-y-8 text-[0.95rem] leading-7 text-muted">
          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">Éditeur du site</h2>
            <p className="mt-3">
              {site.legalName} — {site.address.street}, {site.address.postalCode} {site.address.city},{" "}
              {site.address.country}.
              <br />
              Téléphone :{" "}
              <a href={`tel:${site.phone.e164}`} className="text-gold-600 underline">
                {site.phone.display}
              </a>
              {site.email && (
                <>
                  {" "}
                  — E-mail :{" "}
                  <a href={`mailto:${site.email}`} className="text-gold-600 underline">
                    {site.email}
                  </a>
                </>
              )}
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">Hébergement</h2>
            <p className="mt-3">
              Le site est hébergé par le prestataire d’hébergement choisi par l’éditeur. Les
              coordonnées complètes de l’hébergeur peuvent être communiquées sur simple demande.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">Propriété intellectuelle</h2>
            <p className="mt-3">
              L’ensemble des contenus (textes, images, logo) présents sur ce site est la propriété de{" "}
              {site.legalName}, sauf mention contraire. Toute reproduction, représentation ou
              diffusion, totale ou partielle, sans autorisation préalable est interdite.
            </p>
          </section>

          <section id="confidentialite" className="scroll-mt-24">
            <h2 className="font-display text-xl font-semibold text-navy-900">
              Politique de confidentialité (RGPD)
            </h2>
            <p className="mt-3">
              Les informations recueillies via le formulaire de contact (nom, téléphone, e-mail,
              message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont ni
              cédées ni vendues à des tiers. Conformément au Règlement Général sur la Protection des
              Données, vous disposez d’un droit d’accès, de rectification et de suppression de vos
              données : il suffit d’en faire la demande par téléphone ou par e-mail.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">Cookies</h2>
            <p className="mt-3">
              Ce site n’utilise pas de cookies de suivi publicitaire. Seuls des cookies techniques
              strictement nécessaires au bon fonctionnement du site peuvent être déposés.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
