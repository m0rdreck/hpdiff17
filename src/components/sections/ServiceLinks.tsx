import Link from "next/link";
import { serviceDetails } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/** Grille de liens vers les pages de service détaillées (cluster SEO). */
export function ServiceLinks({
  title = "Mes prestations détaillées",
  intro,
  tone = "white",
}: {
  title?: string;
  intro?: string;
  tone?: "white" | "light";
}) {
  const services = Object.values(serviceDetails);
  return (
    <section className={`${tone === "light" ? "bg-navy-25" : "bg-white"} py-16 sm:py-24`}>
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-500" />
            Prestations
          </span>
          <h2 className="section-title mt-4">{title}</h2>
          {intro && <p className="mt-5 text-base leading-8 text-muted">{intro}</p>}
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <Link
                href={`/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-navy-900/8 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon name="check" className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">
                  {s.hero.title} {s.hero.highlight}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                  En savoir plus
                  <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
