import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { group } from "@/lib/media";

const abs = (path: string) => `${site.url}${path}`;
const imagesOf = (slug: string) => group(slug).map((i) => abs(i.src));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: abs(""), lastModified: now, images: imagesOf("hero") },
    { url: abs("/work"), lastModified: now },
    {
      url: abs("/experiments"),
      lastModified: now,
      images: imagesOf("experiments"),
    },
    {
      url: abs("/commissions"),
      lastModified: now,
      images: imagesOf("commissions"),
    },
    { url: abs("/about"), lastModified: now },
    { url: abs("/contact"), lastModified: now },
  ];

  // Local-SEO landing pages
  const landings = [
    "/fotografo-editorial-queretaro",
    "/light-painting-queretaro",
    "/retratos-creativos-queretaro",
    "/fotografia-para-artistas-y-musicos",
  ].map((r) => ({ url: abs(r), lastModified: now }));

  const work: MetadataRoute.Sitemap = projects.map((p) => ({
    url: abs(`/work/${p.slug}`),
    lastModified: now,
    images: imagesOf(p.group),
  }));

  return [...staticPages, ...landings, ...work];
}
