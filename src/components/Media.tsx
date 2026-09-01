"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/media";

type Reveal = "mask" | "scale" | "fade" | "none";

type Props = {
  item: MediaItem;
  alt: string;
  sizes?: string;
  className?: string;
  reveal?: Reveal;
  priority?: boolean;
  /** aspect ratio override; defaults to the image's own */
  ratio?: number;
  /** fill the parent element instead of using an aspect ratio */
  fill?: boolean;
};

export default function Media({
  item,
  alt,
  sizes = "100vw",
  className = "",
  reveal = "mask",
  priority = false,
  ratio,
  fill = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Images that finish (or come from cache) before hydration never fire onLoad.
  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  const revealClass =
    reveal === "mask"
      ? "media-mask"
      : reveal === "scale"
        ? "media-scale"
        : reveal === "fade"
          ? ""
          : "";
  const dataReveal = reveal === "fade" ? "fade" : undefined;

  return (
    <figure
      className={`relative overflow-hidden bg-ground-raise ${
        fill ? "h-full w-full" : ""
      } ${revealClass} ${className}`}
      data-reveal={dataReveal}
      style={{
        aspectRatio: fill ? undefined : (ratio ?? item.ratio),
        backgroundImage: `url(${item.lqip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        ref={imgRef}
        src={item.src}
        srcSet={item.srcset}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: loaded ? 1 : 0 }}
        draggable={false}
      />
    </figure>
  );
}
