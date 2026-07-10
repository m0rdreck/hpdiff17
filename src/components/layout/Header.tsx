"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import type { SiteConfig } from "@/content/types";

export function Header({ site }: { site: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
          <Image src={site.logo} alt={site.name} width={110} height={106} priority className="h-12 w-auto" />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active ? "text-navy-900" : "text-navy-900/70 hover:text-navy-900"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-4 -bottom-px h-0.5 origin-left rounded-full bg-gold-500 transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phone.e164}`}
            className="flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-gold-50 text-gold-600">
              <Icon name="phone" className="size-4" />
            </span>
            {site.phone.display}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-700"
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
        className={`overflow-hidden border-t border-navy-900/8 bg-white lg:hidden ${
          open ? "max-h-[26rem]" : "max-h-0"
        } transition-[max-height] duration-300 ease-in-out`}
      >
        <nav aria-label="Navigation mobile" className="container-page flex flex-col py-4">
          {site.nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b border-navy-900/5 py-3 text-base font-medium ${
                  active ? "text-gold-600" : "text-navy-900/80"
                }`}
              >
                {item.label}
              </Link>
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
