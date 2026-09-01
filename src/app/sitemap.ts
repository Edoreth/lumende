import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/experiments", "/commissions", "/about", "/contact"];
  const base = routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: new Date(),
  }));
  const work = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...base, ...work];
}
