import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import { group } from "@/lib/media";
import { services } from "@/data/site";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Encargos",
  description:
    "Fotografía por encargo de LUMENDE para moda, artistas, músicos, retratos, editorial y campañas creativas.",
  alternates: { canonical: "/commissions" },
};

const items = group("commissions");
const fields: { es: string; en: string }[] = [
  { es: "Moda", en: "Fashion" },
  { es: "Artistas", en: "Artists" },
  { es: "Músicos", en: "Musicians" },
  { es: "Retratos", en: "Portraits" },
  { es: "Editorial", en: "Editorial" },
  { es: "Campañas Creativas", en: "Creative Campaigns" },
  { es: "Marcas", en: "Brands" },
];

export default function CommissionsPage() {
  return (
    <section className="pb-[clamp(3rem,8vh,6rem)] pt-[clamp(7rem,18vh,12rem)]">
      <header className="px-[var(--pad)] mb-[clamp(3rem,9vh,7rem)]">
        <h1 className="label mb-8">
          <T es="Encargos" en="Commissions" />
        </h1>
        <p className="display max-w-[16ch] text-[clamp(2.25rem,7vw,5.5rem)] text-ink">
          <T
            es="Disponible para encargos, colaboraciones y proyectos creativos seleccionados."
            en="Available for selected commissions, collaborations and creative projects."
          />
        </p>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {fields.map((f) => (
            <li key={f.en} className="label">
              <T es={f.es} en={f.en} />
            </li>
          ))}
        </ul>
      </header>

      {/* Selected commercial work — editorial two-column rhythm */}
      <div className="grid grid-cols-1 gap-[clamp(1rem,2.5vw,2.5rem)] px-[var(--pad)] md:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`break-inside-avoid ${
              i % 3 === 0 ? "md:mt-[clamp(2rem,8vh,6rem)]" : ""
            }`}
          >
            <Media
              item={item}
              alt={`LUMENDE — encargo ${i + 1}`}
              sizes="(max-width:768px) 100vw, 48vw"
              reveal="mask"
            />
          </div>
        ))}
      </div>

      {/* Services, discreetly */}
      <div className="mt-[clamp(4rem,12vh,9rem)] border-t border-line px-[var(--pad)] pt-[clamp(2.5rem,7vh,5rem)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <p className="label max-w-[16ch]">
            <T es="Lo que hace el estudio" en="What the studio makes" />
          </p>
          <ul className="grid max-w-2xl grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
            {services.map((s) => (
              <li
                key={s.en}
                className="font-serif text-[clamp(1.1rem,2vw,1.5rem)] text-ink"
              >
                <T es={s.es} en={s.en} />
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/contact"
          className="label mt-12 inline-block border-b border-line pb-1 transition-colors hover:!text-ink hover:border-ink"
        >
          <T es="Iniciar un proyecto →" en="Start a project →" />
        </Link>
      </div>
    </section>
  );
}
