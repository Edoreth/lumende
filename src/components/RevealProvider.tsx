"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals scroll targets by setting `data-in` (an attribute React never
 * renders, so imperatively adding it can't cause a hydration mismatch on the
 * React-controlled className). Primary trigger is an IntersectionObserver; a
 * passive scroll listener is a safety net so nothing ever stays hidden.
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
      ).filter((el) => !el.hasAttribute("data-in"));

    if (reduce) {
      remaining().forEach((el) => el.setAttribute("data-in", ""));
      return;
    }

    // Reveal well before an element scrolls into view, so a fast scroll never
    // lands on an un-revealed (blank) frame.
    const revealInView = () => {
      const h = window.innerHeight;
      for (const el of remaining()) {
        const r = el.getBoundingClientRect();
        if (r.top < h * 1.35 && r.bottom > -h * 0.35)
          el.setAttribute("data-in", "");
      }
    };

    // Reveal whatever is already visible on load.
    revealInView();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px 35% 0px", threshold: 0 }
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
