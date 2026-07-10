import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { ServiceCard } from "@/content/types";

export function ServicesGrid({
  title,
  intro,
  services,
  tone = "light",
}: {
  title?: string;
  intro?: string;
  services: ServiceCard[];
  tone?: "white" | "light";
}) {
  const cols = services.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-2" : "sm:grid-cols-2";
  return (
    <section className={`${tone === "light" ? "bg-navy-25" : "bg-white"} py-16 sm:py-24`}>
      <div className="container-page">
        {(title || intro) && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">
              <span className="h-px w-8 bg-gold-500" />
              Prestations
            </span>
            {title && <h2 className="section-title mt-4">{title}</h2>}
            {intro && <p className="mt-5 text-base leading-8 text-muted">{intro}</p>}
          </Reveal>
        )}

        <div className={`mt-12 grid gap-6 ${cols}`}>
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={(i % 2) * 120}
              as="article"
              className="group flex flex-col overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 to-transparent" />
                <span className="absolute left-5 top-5 flex size-11 items-center justify-center rounded-xl bg-white/95 text-gold-600 shadow-sm backdrop-blur">
                  <Icon name="check" className="size-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-semibold text-navy-900">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">{service.description}</p>
                <span className="mt-5 h-1 w-12 rounded-full bg-gold-500 transition-all duration-300 group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
