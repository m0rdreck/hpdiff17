import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles, getSiteConfig } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ContactCta } from "@/components/sections/ContactCta";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { BreadcrumbSchema } from "@/components/StructuredData";

const PATH = "/guides";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: "Guides & conseils d’un électricien à Saintes | HP Diff" },
    description:
      "Conseils pratiques d’un électricien à Saintes : prix d’une mise aux normes, quand changer son tableau électrique, rénovation, dépannage… Des réponses claires par HP Diff.",
    alternates: { canonical: PATH },
  };
}

export default async function GuidesPage() {
  const [site, articles] = await Promise.all([getSiteConfig(), getAllArticles()]);

  return (
    <>
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Accueil", path: "/" },
          { name: "Guides & conseils", path: PATH },
        ]}
      />

      {/* En-tête */}
      <section className="bg-white pt-16 pb-12 sm:pt-24">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-px w-8 bg-gold-500" />
              Guides &amp; conseils
            </span>
            <h1 className="section-title mt-4">Conseils d’un électricien à Saintes</h1>
            <p className="mt-5 text-base leading-8 text-muted">
              Des réponses claires aux questions que l’on me pose le plus souvent : prix,
              sécurité, rénovation, dépannage. De quoi y voir plus clair avant de vous lancer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grille d'articles */}
      <section className="bg-navy-25 py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 2) * 100}>
                <Link
                  href={`/guides/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-navy-900/90 px-3 py-1 text-xs font-semibold text-gold-400 backdrop-blur">
                      {a.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-xl font-semibold text-navy-900">{a.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted">{a.excerpt}</p>
                    <span className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-muted">{a.readingMinutes} min de lecture</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-gold-600">
                        Lire le guide
                        <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        site={site}
        title="Une question sur vos travaux électriques ?"
        text="Plutôt qu’un article, un conseil personnalisé : appelez-moi ou demandez un devis gratuit, je réponds à votre situation précise."
      />
      <ServiceAreaSection site={site} />
    </>
  );
}
