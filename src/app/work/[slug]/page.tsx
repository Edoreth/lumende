import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import ProjectStream from "@/components/ProjectStream";
import { projects, projectMap, nextProject } from "@/data/projects";
import { group } from "@/lib/media";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projectMap[slug];
  if (!p) return {};
  const hero = group(p.group)[0];
  return {
    title: `${p.title} — Selected Work`,
    description: `${p.concept} ${p.category}, ${p.year}.`,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${p.title} — LUMENDE`,
      description: p.concept,
      images: hero ? [{ url: hero.src, width: hero.w, height: hero.h }] : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = projectMap[slug];
  if (!p) notFound();

  const items = group(p.group);
  const offset = projects.findIndex((x) => x.slug === slug);
  const next = nextProject(slug);
  const nextPreview = group(next.group)[0];

  return (
    <article>
      {/* Opening — editorial cover */}
      <header className="px-[var(--pad)] pb-[clamp(2rem,6vh,5rem)] pt-[clamp(7rem,20vh,13rem)]">
        <p className="label mb-8">
          {p.year} — {p.category}
        </p>
        <h1 className="display text-ink text-[clamp(3.5rem,15vw,12rem)]">
          {p.title}
        </h1>
        <p className="mt-8 max-w-[24ch] text-[clamp(1.1rem,2.2vw,1.6rem)] leading-snug text-ink-dim">
          {p.concept}
        </p>
      </header>

      {/* Editorial stream */}
      <ProjectStream
        items={items}
        title={p.title}
        offset={offset}
        concept={p.concept}
      />

      {/* Description + credits */}
      <section className="grid grid-cols-1 gap-[clamp(2rem,6vw,5rem)] border-t border-line px-[var(--pad)] py-[clamp(4rem,12vh,9rem)] md:grid-cols-[1.4fr_1fr]">
        <p className="measure text-[clamp(1.1rem,1.7vw,1.4rem)] leading-relaxed text-ink">
          {p.description}
        </p>
        <dl className="flex flex-col gap-4 self-start md:pt-2">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <dt className="label">Title</dt>
            <dd className="font-serif text-lg text-ink">{p.title}</dd>
          </div>
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <dt className="label">Year</dt>
            <dd className="font-serif text-lg text-ink">{p.year}</dd>
          </div>
          {p.credits.map((c) => (
            <div
              key={c.role}
              className="flex items-baseline justify-between border-b border-line pb-3"
            >
              <dt className="label">{c.role}</dt>
              <dd className="font-serif text-lg text-ink">{c.name}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        className="group relative block h-[70vh] w-full overflow-hidden"
      >
        {nextPreview && (
          <Media
            item={nextPreview}
            alt={`${next.title} — next project`}
            sizes="100vw"
            reveal="none"
            fill
            className="opacity-70 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:opacity-90"
          />
        )}
        <div className="absolute inset-0 bg-ground/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="label !text-white/80">Next Project →</span>
          <span className="display mt-3 text-white text-[clamp(2.5rem,10vw,8rem)]">
            {next.title}
          </span>
        </div>
      </Link>
    </article>
  );
}
