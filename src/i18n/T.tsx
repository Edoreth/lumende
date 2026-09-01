import type { ReactNode } from "react";

/**
 * Bilingual text. Renders both languages; CSS (driven by <html data-lang>)
 * shows only the active one. Spanish is the default/main language.
 * Server-component safe — no client hooks.
 */
export function T({ es, en }: { es: ReactNode; en: ReactNode }) {
  return (
    <>
      <span data-l="es">{es}</span>
      <span data-l="en">{en}</span>
    </>
  );
}

/** Pick a plain string for the current default language (server render = es). */
export function tt(pair: { es: string; en: string }) {
  return pair.es;
}
