"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/media";
import Media from "./Media";

export type WorkEntry = {
  slug: string;
  title: string;
  year: string;
  category: string;
  concept: string;
  preview: MediaItem;
};

export default function SelectedWork({ entries }: { entries: WorkEntry[] }) {
  const [active, setActive] = useState<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const canHover = useRef(false);

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = previewRef.current;
      if (!el) return;
      // Ease toward cursor, offset up-left so the name stays readable.
      el.style.transform = `translate3d(${pos.current.x - el.offsetWidth / 2}px, ${
        pos.current.y - el.offsetHeight / 2
      }px, 0)`;
    });
  }, []);

  return (
    <section
      className="relative"
      onPointerMove={canHover.current ? onMove : undefined}
    >
      {/* Floating preview — desktop only */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 hidden w-[clamp(240px,26vw,400px)] will-change-transform md:block"
      >
        {active !== null && (
          <div
            key={entries[active].slug}
            style={{ aspectRatio: entries[active].preview.ratio }}
            className="preview-in relative overflow-hidden"
          >
            <img
              src={entries[active].preview.src}
              srcSet={entries[active].preview.srcset}
              sizes="26vw"
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* Desktop: name index */}
      <ul className="hidden md:block">
        {entries.map((e, i) => (
          <li key={e.slug} className="border-t border-line last:border-b">
            <Link
              href={`/work/${e.slug}`}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-8 py-[clamp(1.5rem,4vw,3rem)] transition-colors"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="flex items-baseline gap-6">
                <span
                  className="display text-[clamp(2.5rem,8vw,7rem)] text-ink transition-[opacity,letter-spacing] duration-500"
                  style={{
                    opacity: active === null || active === i ? 1 : 0.28,
                  }}
                >
                  {e.title}
                </span>
                <span
                  className="label hidden translate-y-[-0.3em] transition-opacity duration-500 lg:inline"
                  style={{ opacity: active === i ? 1 : 0 }}
                >
                  {e.concept}
                </span>
              </span>
              <span className="flex items-baseline gap-6 whitespace-nowrap">
                <span className="label">{e.category}</span>
                <span className="label !text-ink">{e.year}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile: image-led stack, hover replaced by scroll reveal */}
      <div className="flex flex-col gap-16 md:hidden">
        {entries.map((e) => (
          <Link key={e.slug} href={`/work/${e.slug}`} className="block">
            <Media
              item={e.preview}
              alt={`${e.title} — ${e.category}`}
              sizes="100vw"
              reveal="mask"
            />
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="display text-[clamp(2rem,12vw,3.5rem)] text-ink">
                {e.title}
              </h3>
              <span className="label !text-ink">{e.year}</span>
            </div>
            <p className="label mt-1">{e.category}</p>
            <p className="mt-3 measure text-sm text-ink-dim">{e.concept}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
