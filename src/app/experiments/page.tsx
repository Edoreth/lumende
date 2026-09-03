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
    <section className="px-[var(--pad)] pb-[clamp(4rem,10vh,8rem)] pt-[clamp(5.5rem,11vh,7.5rem)]">
      <header className="mb-[clamp(1.75rem,4vh,3rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[24ch]">
          <h1 className="label mb-4">
            <T es="Experimentos · Pintar con Luz" en="Experiments · Painting with Light" />
          </h1>
          <p className="display text-[clamp(1.75rem,4vw,3rem)] text-ink">
            <T
              es="Una sola exposición, larga: la luz dibuja lo que el cuerpo insinúa."
              en="A single long exposure: light draws what the body only suggests."
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
