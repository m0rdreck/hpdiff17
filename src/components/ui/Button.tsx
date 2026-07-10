import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import type { Cta } from "@/content/types";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2";

const variants = {
  // Bouton principal : bleu marine, texte blanc
  primary:
    "bg-navy-900 text-white shadow-[0_16px_34px_-18px_rgba(21,23,74,0.85)] hover:-translate-y-0.5 hover:bg-navy-700",
  // Bouton secondaire clair : contour discret sur fond clair
  outline:
    "border border-navy-900/15 bg-white/70 text-navy-900 backdrop-blur hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-600",
  // Accent doré (sur fonds foncés)
  ghost:
    "bg-gold-500 text-navy-950 shadow-[0_16px_34px_-18px_rgba(212,166,42,0.8)] hover:-translate-y-0.5 hover:bg-gold-400",
} as const;

export function Button({
  cta,
  className = "",
  fullWidth = false,
}: {
  cta: Cta;
  className?: string;
  fullWidth?: boolean;
}) {
  const variant = cta.variant ?? "primary";
  const external =
    cta.href.startsWith("http") || cta.href.startsWith("tel:") || cta.href.startsWith("mailto:");

  const content = (
    <>
      {/* reflet animé au survol */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      {cta.icon && cta.icon !== "arrow" && <Icon name={cta.icon as IconName} className="size-4" />}
      <span className="relative">{cta.label}</span>
      {cta.icon === "arrow" && (
        <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  const cls = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (external) {
    return (
      <a href={cta.href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={cls}>
      {content}
    </Link>
  );
}
