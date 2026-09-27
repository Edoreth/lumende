import Link from "next/link";
import { site } from "@/data/site";
import { landings } from "@/data/landings";
import { T } from "@/i18n/T";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-[var(--pad)] py-[clamp(3rem,7vw,6rem)]">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Link
            href="/"
            className="display block text-ink text-[clamp(2rem,6vw,3.5rem)]"
          >
            {site.name}
          </Link>
          <p className="label mt-3">
            <T es={site.tagline.es} en={site.tagline.en} />
          </p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Servicios">
          <span className="label !text-ink-faint">
            <T es="Servicios" en="Services" />
          </span>
          {landings.map((l) => (
            <Link
              key={l.slug}
              href={`/${l.slug}`}
              className="label transition-colors hover:text-ink"
            >
              <T es={l.title.es} en={l.title.en} />
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="label">{site.location}</span>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="label transition-colors hover:text-ink"
          >
            Instagram
          </a>
          <a
            href={`mailto:${site.email}`}
            className="label transition-colors hover:text-ink"
          >
            {site.email}
          </a>
          <a
            href={`tel:${site.phone.e164}`}
            className="label transition-colors hover:text-ink"
          >
            {site.phone.display}
          </a>
          <a
            href={site.googleProfile}
            target="_blank"
            rel="noreferrer"
            className="label transition-colors hover:text-ink"
          >
            Google
          </a>
        </div>
      </div>
      <p className="label mt-16 !text-ink-faint !tracking-[0.18em]">
        © {year} {site.name} Studio
      </p>
    </footer>
  );
}
