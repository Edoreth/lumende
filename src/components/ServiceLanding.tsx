import Link from "next/link";
import Media from "@/components/Media";
import { group } from "@/lib/media";
import type { Landing } from "@/data/landings";
import { T } from "@/i18n/T";

export default function ServiceLanding({ data }: { data: Landing }) {
  const hero = group(data.heroGroup)[0];
  const gallery = data.gallery
    .map((g) => group(g)[1] ?? group(g)[0])
    .filter(Boolean);

  return (
    <article>
      {/* Opening */}
      <header className="px-[var(--pad)] pb-[clamp(2rem,6vh,4rem)] pt-[clamp(6rem,16vh,11rem)]">
        <p className="label mb-6">
          <T es={data.kicker.es} en={data.kicker.en} />
        </p>
        <h1 className="display max-w-[16ch] text-ink text-[clamp(2.5rem,8vw,6.5rem)]">
          <T es={data.title.es} en={data.title.en} />
        </h1>
        <p className="measure mt-8 text-[clamp(1.1rem,1.9vw,1.5rem)] leading-relaxed text-ink-dim">
          <T es={data.lead.es} en={data.lead.en} />
        </p>
        <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/contact"
            className="label border-b border-line pb-1 transition-colors hover:!text-ink hover:border-ink"
          >
            <T es="Cotizar una sesión →" en="Get a quote →" />
          </Link>
          <Link
            href="/work"
            className="label border-b border-line pb-1 transition-colors hover:!text-ink hover:border-ink"
          >
            <T es="Ver proyectos →" en="View projects →" />
          </Link>
        </div>
      </header>

      {hero && (
        <div className="w-full">
          <Media
            item={hero}
            alt={`${data.title.es} — LUMENDE, ${data.metaTitle}`}
            sizes="100vw"
            reveal="scale"
            priority
          />
        </div>
      )}

      {/* Detail blocks */}
      <section className="grid grid-cols-1 gap-x-[clamp(2rem,5vw,4rem)] gap-y-[clamp(2rem,5vh,3.5rem)] border-t border-line px-[var(--pad)] py-[clamp(3.5rem,10vh,7rem)] md:grid-cols-3">
        {data.blocks.map((b) => (
          <div key={b.h.en}>
            <h2 className="label mb-4">
              <T es={b.h.es} en={b.h.en} />
            </h2>
            <p className="measure text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-ink">
              <T es={b.p.es} en={b.p.en} />
            </p>
          </div>
        ))}
      </section>

      {/* Small gallery */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.75rem)] px-[var(--pad)] md:grid-cols-3">
          {gallery.map((item, i) => (
            <Media
              key={item.id}
              item={item}
              alt={`${data.title.es} en Querétaro — LUMENDE ${i + 1}`}
              sizes="(max-width:768px) 50vw, 33vw"
              reveal="mask"
            />
          ))}
        </div>
      )}

      {/* CTA */}
      <section className="mt-[clamp(4rem,12vh,9rem)] border-t border-line px-[var(--pad)] py-[clamp(3.5rem,10vh,7rem)]">
        <p className="display max-w-[18ch] text-ink text-[clamp(2rem,5vw,3.75rem)]">
          <T
            es="¿Tienes un proyecto en mente?"
            en="Have a project in mind?"
          />
        </p>
        <Link
          href="/contact"
          className="label mt-8 inline-block border-b border-line pb-1 transition-colors hover:!text-ink hover:border-ink"
        >
          <T es="Cotizar una sesión →" en="Get a quote →" />
        </Link>
      </section>
    </article>
  );
}
