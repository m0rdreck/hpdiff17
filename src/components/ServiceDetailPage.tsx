import Link from "next/link";
import { getServiceDetail, getSiteConfig } from "@/lib/content";
import { serviceDetails } from "@/content/services";
import { Hero } from "@/components/sections/Hero";
import { IntroBlock } from "@/components/sections/IntroBlock";
import { ContactCta } from "@/components/sections/ContactCta";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { FaqSchema } from "@/components/StructuredData";
import { notFound } from "next/navigation";

export async function ServiceDetailPage({ slug }: { slug: string }) {
  const [site, service] = await Promise.all([getSiteConfig(), getServiceDetail(slug)]);
  if (!service) notFound();

  const related = (service.related ?? [])
    .map((s) => serviceDetails[s])
    .filter(Boolean);

  return (
    <>
      <FaqSchema items={site.faq} />
      <Hero hero={service.hero} site={site} priority />

      <IntroBlock title={service.hero.title + " " + (service.hero.highlight ?? "")} body={service.intro} tone="white" />

      {/* Prestations incluses */}
      <section className="bg-navy-25 py-16 sm:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">
              <span className="h-px w-8 bg-gold-500" />
              Ce que je réalise
            </span>
            <h2 className="section-title mt-4">Mes prestations</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {service.benefits.map((b, i) => (
              <Reveal
                key={b.title}
                delay={(i % 2) * 110}
                className="flex gap-4 rounded-3xl border border-navy-900/8 bg-white p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon name="check" className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Étapes */}
      {service.steps && service.steps.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold-500" />
                Déroulement
              </span>
              <h2 className="section-title mt-4">Comment je procède</h2>
            </Reveal>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.steps.map((step, i) => (
                <Reveal
                  key={step.title}
                  as="li"
                  delay={i * 90}
                  className="relative rounded-3xl border border-navy-900/8 bg-navy-25 p-6"
                >
                  <span className="font-display text-3xl font-bold text-gold-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Services liés (maillage interne) */}
      {related.length > 0 && (
        <section className="bg-navy-25 py-14">
          <div className="container-page">
            <h2 className="section-title text-center">Autres prestations</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-navy-900/12 bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-600"
                >
                  {r.hero.title} {r.hero.highlight}
                  <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCta
        site={site}
        title={`Un projet de ${service.hero.title.toLowerCase()} ${service.hero.highlight?.toLowerCase() ?? ""} ?`}
        text="Contactez-moi pour une intervention adaptée à vos besoins ou pour obtenir un devis gratuit et sans engagement."
      />

      <ServiceAreaSection site={site} />

      <section className="bg-navy-25 py-16 sm:py-24">
        <Reveal className="container-page max-w-3xl">
          <Faq items={site.faq} />
        </Reveal>
      </section>
    </>
  );
}
