import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { FeatureSection as FeatureContent } from "@/content/types";

export function FeatureSection({
  feature,
  tone = "white",
}: {
  feature: FeatureContent;
  tone?: "white" | "light";
}) {
  const imageRight = feature.imageSide === "right";
  return (
    <section className={`${tone === "light" ? "bg-navy-25" : "bg-white"} py-16 sm:py-24`}>
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal className={imageRight ? "lg:order-2" : "lg:order-1"}>
          <div className="group relative">
            <span
              className="absolute -inset-3 -z-10 rounded-[2.2rem] opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(212,166,42,0.28), transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)] ring-1 ring-navy-900/5">
              <Image
                src={feature.image}
                alt={feature.imageAlt}
                width={720}
                height={560}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[22rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-[26rem]"
              />
            </div>
          </div>
        </Reveal>

        {/* Texte */}
        <Reveal delay={120} className={imageRight ? "lg:order-1" : "lg:order-2"}>
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold-500" />
            HP Diff
          </span>
          <h2 className="section-title mt-4">{feature.title}</h2>
          <p className="mt-5 text-base leading-8 text-muted">{feature.body}</p>
          {feature.cta && (
            <div className="mt-8">
              <Button cta={feature.cta} />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
