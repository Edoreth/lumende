import manifest from "@/data/media.json";

export type MediaItem = {
  id: string;
  orientation: "landscape" | "portrait" | "square";
  w: number;
  h: number;
  ratio: number;
  lqip: string;
  widths: number[];
  srcset: string;
  src: string;
  sources: { w: number; src: string }[];
};

const data = manifest as Record<string, MediaItem[]>;

export function group(slug: string): MediaItem[] {
  return data[slug] ?? [];
}

export function pick(slug: string, index: number): MediaItem | undefined {
  return group(slug)[index];
}

/** All items across a set of groups, in order. */
export function collect(...slugs: string[]): MediaItem[] {
  return slugs.flatMap((s) => group(s));
}
