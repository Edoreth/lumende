import type { Metadata } from "next";
import Media from "@/components/Media";
import { group } from "@/lib/media";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Experimentos",
  description:
    "Exploraciones visuales personales de LUMENDE — light painting, larga exposición, motion blur, proyección, reflejos y accidente.",
  alternates: { canonical: "/experiments" },
};

const items = group("experiments");

const tags: { es: string; en: string }[] = [
  { es: "Light Painting", en: "Light Painting" },
  { es: "Larga Exposición", en: "Long Exposure" },
  { es: "Motion Blur", en: "Motion Blur" },
  { es: "Proyección", en: "Projection" },
  { es: "Reflejos", en: "Reflections" },
  { es: "Luz de Color", en: "Colored Light" },
  { es: "Prismas", en: "Prisms" },
  { es: "Humo", en: "Smoke" },
  { es: "Distorsión", en: "Distortion" },
];

export default function ExperimentsPage() {
  return (
    <section className="px-[var(--pad)] pb-[clamp(4rem,10vh,8rem)] pt-[clamp(7rem,18vh,12rem)]">
      <header className="mb-[clamp(3rem,9vh,7rem)] flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[20ch]">
          <h1 className="label mb-6">
            <T es="Experimentos" en="Experiments" />
          </h1>
          <p className="display text-[clamp(2rem,6vw,4.5rem)] text-ink">
            <T
              es="Pruebas, accidentes y luz dejada correr."
              en="Tests, accidents and light left running."
            />
          </p>
        </div>
        <ul className="flex max-w-md flex-wrap gap-x-4 gap-y-1">
          {tags.map((t) => (
            <li key={t.en} className="label !text-ink-faint">
              <T es={t.es} en={t.en} />
            </li>
          ))}
        </ul>
      </header>

      {/* Contact-sheet — irregular columns, revealed on scroll */}
      <div className="[column-fill:_balance] columns-1 gap-[clamp(1rem,2.5vw,2.5rem)] sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <div key={item.id} className="mb-[clamp(1rem,2.5vw,2.5rem)] break-inside-avoid">
            <Media
              item={item}
              alt={`Experiment ${i + 1}`}
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              reveal="fade"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
