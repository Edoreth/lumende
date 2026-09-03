import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import { group } from "@/lib/media";
import { site } from "@/data/site";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Estudio",
  description:
    "LUMENDE es un estudio de fotografía y creación visual que explora la relación entre la luz, el movimiento y la figura humana. Con base en Querétaro, México.",
  alternates: { canonical: "/about" },
};

const portrait =
  group("vestida").find((i) => i.id === "vestida-02") ??
  group("reverie-nightmare")[0];

// A short cross-section of the work, so the studio page isn't a single image.
const gallery = [
  group("reverie-nightmare")[6],
  group("blue")[2],
  group("vestida")[7],
  group("experiments")[4],
  group("fantasma")[3],
  group("yoga")[5],
].filter(Boolean);

export default function AboutPage() {
  return (
    <section className="px-[var(--pad)] pb-[clamp(4rem,10vh,8rem)] pt-[clamp(7rem,18vh,12rem)]">
      <div className="grid grid-cols-1 gap-[clamp(2.5rem,6vw,5rem)] md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="w-full md:max-w-[460px]">
          <Media
            item={portrait}
            alt="Retrato de LUMENDE — una figura envuelta en luz proyectada"
            sizes="(max-width:768px) 100vw, 40vw"
            reveal="mask"
          />
        </div>

        <div>
          <h1 className="label mb-8">
            <T es="Estudio" en="About" />
          </h1>
          <p className="display max-w-[15ch] text-[clamp(2rem,5vw,4rem)] text-ink">
            <T
              es="Imágenes entre la realidad y la ficción."
              en="Images somewhere between reality and fiction."
            />
          </p>
          <div className="mt-10 max-w-[52ch] space-y-6 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-ink-dim">
            <p>
              <T
                es="LUMENDE es un estudio de fotografía y creación visual que explora la relación entre la luz, el movimiento y la figura humana."
                en="LUMENDE is a photography and visual studio exploring the relationship between light, movement and the human figure."
              />
            </p>
            <p>
              <T
                es="El trabajo combina fotografía editorial, iluminación cinematográfica, larga exposición y técnicas experimentales para crear imágenes entre la realidad y la ficción."
                en="The work combines editorial photography, cinematic lighting, long exposure and experimental techniques to create images somewhere between reality and fiction."
              />
            </p>
            <p className="text-ink">
              <T
                es={`Con base en ${site.location}.`}
                en={`Based in ${site.location}.`}
              />
            </p>
            <p>
              <T
                es="Disponible para encargos editoriales, colaboraciones creativas y proyectos comerciales seleccionados."
                en="Available for editorial commissions, creative collaborations and selected commercial projects."
              />
            </p>
          </div>
          <div className="mt-10 flex gap-8">
            <Link
              href="/contact"
              className="label border-b border-line pb-1 transition-colors hover:!text-ink hover:border-ink"
            >
              <T es="Contacto →" en="Contact →" />
            </Link>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="label border-b border-line pb-1 transition-colors hover:!text-ink hover:border-ink"
            >
              Instagram →
            </a>
          </div>
        </div>
      </div>

      {/* A cross-section of the work */}
      <div className="mt-[clamp(4rem,12vh,9rem)] grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.75rem)] md:grid-cols-3">
        {gallery.map((item, i) => (
          <Media
            key={item.id}
            item={item}
            alt={`Fotografía editorial y retrato creativo en Querétaro — LUMENDE ${i + 1}`}
            sizes="(max-width:768px) 50vw, 33vw"
            reveal="mask"
          />
        ))}
      </div>
    </section>
  );
}
