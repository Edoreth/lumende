"use client";

import { useEffect, useState } from "react";

type Lang = "es" | "en";

export default function LangToggle({
  className = "",
}: {
  className?: string;
}) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const current = (document.documentElement.dataset.lang as Lang) || "es";
    setLang(current);
  }, []);

  function choose(next: Lang) {
    document.documentElement.dataset.lang = next;
    document.documentElement.lang = next;
    try {
      localStorage.setItem("lumende-lang", next);
    } catch {}
    setLang(next);
  }

  return (
    <div
      className={`pointer-events-auto flex items-center gap-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] ${className}`}
      role="group"
      aria-label="Language / Idioma"
    >
      {(["es", "en"] as Lang[]).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i === 1 && <span className="text-white/30">/</span>}
          <button
            type="button"
            onClick={() => choose(l)}
            aria-pressed={lang === l}
            className="text-white transition-opacity hover:opacity-100"
            style={{ opacity: lang === l ? 1 : 0.5 }}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
