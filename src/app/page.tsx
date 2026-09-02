import Link from "next/link";
import Media from "@/components/Media";
import SelectedWork, { type WorkEntry } from "@/components/SelectedWork";
import { projects } from "@/data/projects";
import { group } from "@/lib/media";
import { site } from "@/data/site";
import { T } from "@/i18n/T";

const heroItem = group("hero")[0] ?? group("nightmare")[0];

const entries: WorkEntry[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  year: p.year,
  category: p.category,
  concept: p.concept,
  preview: group(p.group)[0],
}));

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Media
            item={heroItem}
            alt="LUMENDE — dos figuras trazadas con luz roja y azul, larga exposición"
            sizes="100vw"
            reveal="none"
            priority
            fill
          />
        </div>
        {/* legibility scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(6,6,6,0.55) 100%), linear-gradient(to bottom, rgba(6,6,6,0.35), transparent 30%, transparent 60%, rgba(6,6,6,0.7))",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[16vh]">
          <h1 className="display text-center text-white text-[clamp(3.5rem,17vw,15rem)] tracking-[0.06em] drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            {site.name}
          </h1>
          <p className="label mt-4 !text-white/90 !tracking-[0.34em]">
            <T es={site.tagline.es} en={site.tagline.en} />
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <span className="label !text-white/70 animate-pulse">
            <T es="Desliza" en="Scroll" />
          </span>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="px-[var(--pad)] py-[clamp(4rem,12vh,9rem)]">
        <div className="mb-[clamp(2rem,6vh,5rem)] flex items-baseline justify-between">
          <h2 className="label">
            <T es="Trabajo Seleccionado" en="Selected Work" />
          </h2>
          <span className="label !text-ink-faint">
            {String(projects.length).padStart(2, "0")} — 2026
          </span>
        </div>
        <SelectedWork entries={entries} />
      </section>

      {/* LEAD INTO THE REST */}
      <section className="grid grid-cols-1 gap-px border-t border-line md:grid-cols-3">
        {[
          {
            href: "/experiments",
            label: { es: "Experimentos", en: "Experiments" },
            line: { es: "Luz, exposición y accidente.", en: "Light, exposure and accident." },
          },
          {
            href: "/commissions",
            label: { es: "Encargos", en: "Commissions" },
            line: { es: "Para moda, artistas y marcas.", en: "For fashion, artists and brands." },
          },
          {
            href: "/about",
            label: { es: "Estudio", en: "About" },
            line: { es: "El estudio detrás de la luz.", en: "The studio behind the light." },
          },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex min-h-[36vh] flex-col justify-between bg-ground p-[var(--pad)] transition-colors hover:bg-ground-raise"
          >
            <span className="label transition-colors group-hover:!text-ink">
              →
            </span>
            <span>
              <span className="display block text-ink text-[clamp(2rem,5vw,3.75rem)]">
                <T es={c.label.es} en={c.label.en} />
              </span>
              <span className="mt-2 block text-sm text-ink-dim">
                <T es={c.line.es} en={c.line.en} />
              </span>
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
