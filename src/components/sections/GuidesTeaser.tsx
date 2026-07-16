import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/**
 * Aperçu des derniers guides (maillage interne accueil → section Guides).
 * Affiche les `limit` premiers articles.
 */
export function GuidesTeaser({
  articles,
  limit = 3,
  tone = "light",
}: {
  articles: Article[];
  limit?: number;
  tone?: "white" | "light";
}) {
  const list = articles.slice(0, limit);
  if (!list.length) return null;

  return (
    <section className={`${tone === "light" ? "bg-navy-25" : "bg-white"} py-16 sm:py-24`}>
      <div className="container-page">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold-500" />
              Guides &amp; conseils
            </span>
            <h2 className="section-title mt-4">Conseils d’un électricien</h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Prix, sécurité, rénovation, dépannage : des réponses claires avant de vous lancer.
            </p>
          </div>
          <Link
            href="/guides"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold-600"
          >
            Tous les guides
            <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 90}>
              <Link
                href={`/guides/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/8 bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-navy-900/90 px-3 py-1 text-xs font-semibold text-gold-400 backdrop-blur">
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold leading-snug text-navy-900">
                    {a.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                    Lire
                    <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
