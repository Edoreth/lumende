import type { MediaItem } from "@/lib/media";
import Media from "./Media";

type Block =
  | { kind: "full"; a: MediaItem }
  | { kind: "wide"; a: MediaItem }
  | { kind: "portrait"; a: MediaItem; side: "left" | "right" | "center" }
  | { kind: "duo"; a: MediaItem; b: MediaItem }
  | { kind: "detail"; a: MediaItem; side: "left" | "right" }
  | { kind: "text"; text: string };

/**
 * Compose an editorial vertical narrative from a project's images.
 * Rhythm varies per project via `offset`, and orientation steers block choice
 * so portraits become tall columns and landscapes become full-bleed frames.
 */
function buildStream(items: MediaItem[], offset: number, concept: string): Block[] {
  const blocks: Block[] = [];
  const L = items.filter((i) => i.orientation !== "portrait"); // landscape + square
  const P = items.filter((i) => i.orientation === "portrait");
  const any = () => (P.length ? P.shift()! : L.length ? L.shift()! : undefined);

  // Opening: a full-bleed frame (prefer a landscape, else any).
  const opener = L.shift() ?? P.shift();
  if (opener) blocks.push({ kind: "full", a: opener });

  const sides: ("left" | "right" | "center")[] = ["left", "right", "center"];
  let textPlaced = false;
  let i = offset;

  while (P.length || L.length) {
    const step = i % 5;
    if (step === 0 && P.length) {
      blocks.push({ kind: "portrait", a: P.shift()!, side: sides[i % 3] });
    } else if (step === 1 && P.length >= 2) {
      blocks.push({ kind: "duo", a: P.shift()!, b: P.shift()! });
    } else if (step === 2 && !textPlaced && concept) {
      blocks.push({ kind: "text", text: concept });
      textPlaced = true;
    } else if (step === 3 && L.length) {
      blocks.push({ kind: "wide", a: L.shift()! });
    } else if (step === 4 && P.length) {
      blocks.push({ kind: "detail", a: P.shift()!, side: i % 2 ? "right" : "left" });
    } else {
      const a = any();
      if (!a) break;
      blocks.push(
        a.orientation === "portrait"
          ? { kind: "portrait", a, side: sides[i % 3] }
          : { kind: "wide", a }
      );
    }
    i++;
  }

  if (!textPlaced && concept) {
    blocks.splice(Math.min(3, blocks.length), 0, { kind: "text", text: concept });
  }
  return blocks;
}

export default function ProjectStream({
  items,
  title,
  offset = 0,
  concept = "",
}: {
  items: MediaItem[];
  title: string;
  offset?: number;
  concept?: string;
}) {
  const blocks = buildStream(items, offset, concept);

  return (
    <div className="flex flex-col gap-[clamp(4rem,12vh,10rem)]">
      {blocks.map((b, idx) => {
        switch (b.kind) {
          case "full":
            return (
              <div key={idx} className="relative h-[92vh] w-full">
                <Media
                  item={b.a}
                  alt={`${title} — plate ${idx + 1}`}
                  sizes="100vw"
                  reveal="scale"
                  priority={idx === 0}
                  fill
                />
              </div>
            );
          case "wide":
            return (
              <div key={idx} className="px-[var(--pad)]">
                <Media
                  item={b.a}
                  alt={`${title} — plate ${idx + 1}`}
                  sizes="90vw"
                  reveal="mask"
                />
              </div>
            );
          case "portrait": {
            const align =
              b.side === "left"
                ? "md:mr-auto md:ml-[var(--pad)]"
                : b.side === "right"
                  ? "md:ml-auto md:mr-[var(--pad)]"
                  : "mx-auto";
            return (
              <div key={idx} className="px-[var(--pad)] md:px-0">
                <div className={`w-full md:w-[min(52vw,620px)] ${align}`}>
                  <Media
                    item={b.a}
                    alt={`${title} — plate ${idx + 1}`}
                    sizes="(max-width:768px) 100vw, 52vw"
                    reveal="mask"
                  />
                </div>
              </div>
            );
          }
          case "duo":
            return (
              <div
                key={idx}
                className="grid grid-cols-1 gap-4 px-[var(--pad)] sm:grid-cols-2 md:gap-[clamp(1rem,3vw,3rem)]"
              >
                <Media
                  item={b.a}
                  alt={`${title} — plate ${idx + 1}a`}
                  sizes="(max-width:640px) 100vw, 45vw"
                  reveal="mask"
                  className="self-start"
                />
                <Media
                  item={b.b}
                  alt={`${title} — plate ${idx + 1}b`}
                  sizes="(max-width:640px) 100vw, 45vw"
                  reveal="mask"
                  className="self-end sm:mt-[clamp(2rem,10vh,7rem)]"
                />
              </div>
            );
          case "detail": {
            const align = b.side === "right" ? "md:ml-auto" : "md:mr-auto";
            return (
              <div key={idx} className="px-[var(--pad)]">
                <div className={`w-full md:w-[min(38vw,440px)] ${align}`}>
                  <Media
                    item={b.a}
                    alt={`${title} — detail`}
                    sizes="(max-width:768px) 100vw, 38vw"
                    reveal="mask"
                  />
                </div>
              </div>
            );
          }
          case "text":
            return (
              <div key={idx} className="px-[var(--pad)] py-[clamp(2rem,8vh,6rem)]">
                <p
                  className="display mx-auto max-w-[16ch] text-center text-[clamp(1.75rem,4.5vw,3.5rem)] text-ink"
                  data-reveal="rise"
                >
                  {b.text}
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}
