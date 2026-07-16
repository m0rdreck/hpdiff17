import type { ArticleBlock } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Rendu du corps d'un article (guide) à partir de blocs typés.
 * Volontairement simple : chaque type de bloc → un rendu dédié, dans le
 * système de design du site (navy/or, typographie display + corps).
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mx-auto max-w-2xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <Reveal key={i} as="h2" className="mt-12 font-display text-2xl font-bold text-navy-900">
                {block.text}
              </Reveal>
            );
          case "p":
            return (
              <Reveal key={i} as="p" className="mt-5 text-base leading-8 text-ink/85">
                {block.text}
              </Reveal>
            );
          case "ul":
            return (
              <Reveal key={i} as="ul" className="mt-5 grid gap-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base leading-8 text-ink/85">
                    <span
                      aria-hidden
                      className="mt-3 size-1.5 shrink-0 rounded-full bg-gold-500"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </Reveal>
            );
          case "callout":
            return (
              <Reveal
                key={i}
                className="mt-8 rounded-2xl border border-gold-500/30 bg-gold-50 p-5 pl-6 text-base leading-8 text-navy-900 shadow-[var(--shadow-card)] [border-left-width:4px]"
              >
                {block.text}
              </Reveal>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
