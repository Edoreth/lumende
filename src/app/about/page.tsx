import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import { group } from "@/lib/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

const portrait =
  group("afterimage").find((i) => i.id === "afterimage-01") ??
  group("nightmare")[0];

export default function AboutPage() {
  return (
    <section className="px-[var(--pad)] pb-[clamp(4rem,10vh,8rem)] pt-[clamp(7rem,18vh,12rem)]">
      <div className="grid grid-cols-1 gap-[clamp(2.5rem,6vw,5rem)] md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="w-full md:max-w-[460px]">
          <Media
            item={portrait}
            alt="A LUMENDE portrait — a figure wrapped in projected light"
            sizes="(max-width:768px) 100vw, 40vw"
            reveal="mask"
          />
        </div>

        <div>
          <h1 className="label mb-8">About</h1>
          <p className="display max-w-[15ch] text-[clamp(2rem,5vw,4rem)] text-ink">
            Images somewhere between reality and fiction.
          </p>
          <div className="mt-10 max-w-[52ch] space-y-6 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-ink-dim">
            <p>
              LUMENDE is a photography and visual studio exploring the
              relationship between light, movement and the human figure.
            </p>
            <p>
              The work combines editorial photography, cinematic lighting, long
              exposure and experimental techniques to create images somewhere
              between reality and fiction.
            </p>
            <p className="text-ink">Based in {site.location}.</p>
            <p>
              Available for editorial commissions, creative collaborations and
              selected commercial projects.
            </p>
          </div>
          <div className="mt-10 flex gap-8">
            <Link
              href="/contact"
              className="label border-b border-line pb-1 transition-colors hover:!text-ink hover:border-ink"
            >
              Contact →
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
    </section>
  );
}
