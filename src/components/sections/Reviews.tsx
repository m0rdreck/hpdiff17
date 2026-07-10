import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { Review } from "@/content/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-gold-500" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className={`size-4 ${i < rating ? "" : "text-navy-100"}`} />
      ))}
    </div>
  );
}

export function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-500" />
            Témoignages
          </span>
          <h2 className="section-title mt-4">Les avis de mes clients</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal
              key={review.author}
              delay={i * 120}
              as="figure"
              className="flex h-full flex-col rounded-3xl border border-navy-900/8 bg-navy-25 p-7 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <Icon name="quote" className="size-9 text-gold-500/70" />
                <Stars rating={review.rating} />
              </div>
              <blockquote className="mt-5 flex-1 text-[0.95rem] leading-7 text-ink">{review.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-900/8 pt-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-semibold text-gold-400">
                  {review.author.charAt(0)}
                </span>
                <span className="font-display font-medium text-navy-900">{review.author}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
