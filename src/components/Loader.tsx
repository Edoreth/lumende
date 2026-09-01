"use client";

import { useEffect, useState } from "react";

type Phase = "in" | "out" | "gone";

export default function Loader() {
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Only the first visit of the session plays the intro.
    if (sessionStorage.getItem("lumende-entered")) {
      setPhase("gone");
      return;
    }
    const hold = reduce ? 300 : 1400;
    const t1 = setTimeout(() => {
      sessionStorage.setItem("lumende-entered", "1");
      setPhase("out");
    }, hold);
    // Guaranteed removal — never depends on an animation callback firing.
    const t2 = setTimeout(() => setPhase("gone"), hold + 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = phase === "gone" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ground transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === "out" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="loader-word display text-ink text-[clamp(2.5rem,9vw,7rem)]">
        LUMENDE
      </div>
      <p className="loader-tag label mt-6">Photography / Light / Motion</p>
    </div>
  );
}
