import type { Metadata } from "next";
import SelectedWork, { type WorkEntry } from "@/components/SelectedWork";
import { projects } from "@/data/projects";
import { group } from "@/lib/media";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Trabajo Seleccionado",
  description:
    "Proyectos seleccionados de fotografía editorial y experimental de LUMENDE.",
  alternates: { canonical: "/work" },
};

const entries: WorkEntry[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  year: p.year,
  category: p.category,
  concept: p.concept,
  preview: group(p.group)[0],
}));

export default function WorkPage() {
  return (
    <section className="px-[var(--pad)] pb-[clamp(4rem,10vh,8rem)] pt-[clamp(7rem,18vh,12rem)]">
      <header className="mb-[clamp(3rem,9vh,7rem)] max-w-[22ch]">
        <h1 className="label mb-6">
          <T es="Trabajo Seleccionado" en="Selected Work" />
        </h1>
        <p className="display text-[clamp(2rem,6vw,4.5rem)] text-ink">
          <T
            es="Menos imágenes, hechas para recordarse."
            en="Fewer images, made to be remembered."
          />
        </p>
      </header>
      <SelectedWork entries={entries} />
    </section>
  );
}
