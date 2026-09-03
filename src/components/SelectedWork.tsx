"use client";

import Link from "next/link";
import type { MediaItem } from "@/lib/media";
import type { Loc } from "@/data/site";
import { T } from "@/i18n/T";
import Media from "./Media";

export type WorkEntry = {
  slug: string;
  title: string;
  year: string;
  category: Loc;
  concept: Loc;
  preview: MediaItem;
};

export default function SelectedWork({ entries }: { entries: WorkEntry[] }) {
  return (
    <section className="relative">
      {/* Desktop: quiet editorial name index — no floating preview, no flicker */}
      <ul className="hidden md:block">
        {entries.map((e) => (
          <li key={e.slug} className="border-t border-line last:border-b">
            <Link
              href={`/work/${e.slug}`}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-8 py-[clamp(1.5rem,4vw,3rem)]"
            >
              <span className="flex items-baseline gap-6">
                <span className="display text-[clamp(2.5rem,8vw,7rem)] text-ink transition-opacity duration-300 group-hover:opacity-70">
                  {e.title}
                </span>
                <span className="label hidden translate-y-[-0.3em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:inline">
                  <T es={e.concept.es} en={e.concept.en} />
                </span>
              </span>
              <span className="flex items-baseline gap-6 whitespace-nowrap">
                <span className="label">
                  <T es={e.category.es} en={e.category.en} />
                </span>
                <span className="label !text-ink">{e.year}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile: image-led stack, revealed on scroll */}
      <div className="flex flex-col gap-16 md:hidden">
        {entries.map((e) => (
          <Link key={e.slug} href={`/work/${e.slug}`} className="block">
            <Media
              item={e.preview}
              alt={`${e.title} — ${e.category.es}`}
              sizes="100vw"
              reveal="mask"
            />
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="display text-[clamp(2rem,12vw,3.5rem)] text-ink">
                {e.title}
              </h3>
              <span className="label !text-ink">{e.year}</span>
            </div>
            <p className="label mt-1">
              <T es={e.category.es} en={e.category.en} />
            </p>
            <p className="mt-3 measure text-sm text-ink-dim">
              <T es={e.concept.es} en={e.concept.en} />
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
