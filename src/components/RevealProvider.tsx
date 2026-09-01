"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Observes every reveal target on the page and adds `.is-in` when it enters
 * the viewport. Re-scans on route change so freshly rendered content animates.
 */
export default function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], .media-mask, .media-scale"
      )
    );

    if (reduce) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    // Anything already in view on load reveals immediately (no flash).
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
