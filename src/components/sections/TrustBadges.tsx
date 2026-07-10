import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { TrustBadge } from "@/content/types";

export function TrustBadges({ badges }: { badges: TrustBadge[] }) {
  return (
    <section className="relative z-10 bg-white">
      <div className="container-page -mt-6 grid gap-5 pb-2 sm:grid-cols-3">
        {badges.map((badge, i) => (
          <Reveal
            key={badge.label}
            delay={i * 110}
            className="group flex items-center gap-4 rounded-2xl border border-navy-900/8 bg-white px-5 py-5 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 ring-2 ring-gold-500/60 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={badge.icon}
                alt=""
                width={30}
                height={30}
                className="size-7 object-contain"
                /* Les pictogrammes sont en trait noir : on les force en blanc
                   pour un contraste net sur le cercle marine. */
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </span>
            <p className="font-display text-base font-medium leading-snug text-navy-900">{badge.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
