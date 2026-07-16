"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import type { NavItem, SiteConfig } from "@/content/types";

export function Header({ site }: { site: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenSub(null);
  }, [pathname]);

  const isActive = (item: NavItem) => {
    const match = (href: string) =>
      href && (href === "/" ? pathname === "/" : pathname.startsWith(href));
    return match(item.href) || (item.children?.some((c) => match(c.href)) ?? false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-navy-900/8 bg-white/85 shadow-[0_10px_30px_-24px_rgba(21,23,74,0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4 py-2.5">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — accueil`}>
          <Image src={site.logo} alt={site.name} width={58} height={56} priority className="h-14 w-[58px] shrink-0" />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const active = isActive(item);
              const hasChildren = !!item.children?.length;
              return (
                <li key={item.label} className="group relative">
                  {item.href ? (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                        active ? "text-navy-900" : "text-navy-900/70 hover:text-navy-900"
                      }`}
                    >
                      {item.label}
                      {hasChildren && (
                        <Icon name="chevron" className="size-3.5 transition-transform group-hover:-rotate-180" />
                      )}
                      <span
                        className={`absolute inset-x-4 -bottom-px h-0.5 origin-left rounded-full bg-gold-500 transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-navy-900/70 transition-colors hover:text-navy-900"
                    >
                      {item.label}
                      <Icon name="chevron" className="size-3.5 transition-transform group-hover:-rotate-180" />
                    </button>
                  )}

                  {/* Sous-menu */}
                  {hasChildren && (
                    <div className="absolute left-0 top-full z-50 hidden pt-3 group-hover:block group-focus-within:block">
                      <ul className="min-w-60 rounded-2xl border border-navy-900/8 bg-white p-2 shadow-[var(--shadow-soft)]">
                        {item.children!.map((c) => {
                          const childActive = pathname.startsWith(c.href);
                          return (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                aria-current={childActive ? "page" : undefined}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                                  childActive
                                    ? "bg-navy-25 text-gold-600"
                                    : "text-navy-900/80 hover:bg-navy-25 hover:text-gold-600"
                                }`}
                              >
                                <Icon name="chevron" className="size-3 -rotate-90 text-gold-500" />
                                {c.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phone.e164}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-gold-50 text-gold-600">
              <Icon name="phone" className="size-4" />
            </span>
            {site.phone.display}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-700"
          >
            Devis gratuit
            <Icon name="arrow" className="size-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="rounded-full p-2 text-navy-900 lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-6" />
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`overflow-y-auto border-t border-navy-900/8 bg-white lg:hidden ${
          open ? "max-h-[80vh]" : "max-h-0"
        } transition-[max-height] duration-300 ease-in-out`}
      >
        <nav aria-label="Navigation mobile" className="container-page flex flex-col py-4">
          {site.nav.map((item) => {
            const active = isActive(item);
            const hasChildren = !!item.children?.length;
            const expanded = openSub === item.label;
            return (
              <div key={item.label} className="border-b border-navy-900/5">
                <div className="flex items-center justify-between">
                  {item.href ? (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex-1 py-3 text-base font-medium ${active ? "text-gold-600" : "text-navy-900/80"}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex-1 py-3 text-base font-medium text-navy-900/80">{item.label}</span>
                  )}
                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => setOpenSub(expanded ? null : item.label)}
                      aria-expanded={expanded}
                      aria-label={`Afficher ${item.label}`}
                      className="p-2 text-navy-900/70"
                    >
                      <Icon name="chevron" className={`size-5 transition-transform ${expanded ? "-rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {hasChildren && (
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ${
                      expanded ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-0.5 pb-2 pl-3">
                      {item.children!.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="flex items-center gap-2 py-2.5 text-sm text-navy-900/75"
                          >
                            <Icon name="chevron" className="size-3 -rotate-90 text-gold-500" />
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`tel:${site.phone.e164}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/15 px-5 py-3 text-sm font-semibold text-navy-900"
            >
              <Icon name="phone" className="size-4 text-gold-600" />
              {site.phone.display}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Devis gratuit
              <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
