"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals scroll targets by adding `.is-in`. Primary trigger is an
 * IntersectionObserver; a passive scroll listener is a safety net so nothing
 * ever stays hidden (a reveal that never fires would leave blank gaps).
 * Re-scans on route change.
 */
export default function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const SEL = "[data-reveal], .media-mask, .media-scale";
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const remaining = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(SEL)
      ).filter((el) => !el.classList.contains("is-in"));

    if (reduce) {
      remaining().forEach((el) => el.classList.add("is-in"));
      return;
    }

    const revealInView = () => {
      const h = window.innerHeight;
      for (const el of remaining()) {
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.95 && r.bottom > 0) el.classList.add("is-in");
      }
    };

    // Reveal whatever is already visible on load.
    revealInView();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );
    remaining().forEach((el) => io.observe(el));

    // Safety net: reveal on scroll in case the observer misses an element.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        revealInView();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
