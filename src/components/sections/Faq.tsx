"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { FaqItem } from "@/content/types";

export function Faq({ items, heading = "Foire aux questions" }: { items: FaqItem[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;

  return (
    <div>
      <h2 className="section-title">{heading}</h2>
      <div className="mt-6 divide-y divide-navy-900/10 rounded-3xl border border-navy-900/10 bg-white">
        {items.map((item, i) => {
          const expanded = open === i;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-base font-medium text-navy-900">
                  {item.question}
                </span>
                <Icon
                  name="chevron"
                  className={`size-5 shrink-0 text-gold-600 transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid overflow-hidden px-6 transition-all duration-300 ${
                  expanded ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="min-h-0 text-sm leading-7 text-muted">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
