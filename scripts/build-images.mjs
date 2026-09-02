// LUMENDE image pipeline
// Reads scripts/selection.json (the user's chosen photos per section, in order)
// and emits responsive WebP + a tiny blurred LQIP, then writes the manifest.
//
// Re-runnable and incremental: an already-emitted derivative is skipped.
// Usage: node scripts/build-images.mjs [--force]

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_ROOT = "C:/Users/Admin/Desktop/Fotos organizadas";
const OUT_DIR = path.resolve("public/media");
const MANIFEST = path.resolve("src/data/media.json");
const SELECTION = path.resolve("scripts/selection.json");
const WIDTHS = [400, 800, 1280, 1920];
const QUALITY = 80;
const FORCE = process.argv.includes("--force");

async function processImage(rel, slug, index) {
  const srcPath = path.join(SRC_ROOT, rel);
  const base = `${slug}-${String(index + 1).padStart(2, "0")}`;
  const dir = path.join(OUT_DIR, slug);
  await fs.mkdir(dir, { recursive: true });

  const meta = await sharp(srcPath, { failOn: "none" }).rotate().metadata();
  const srcW = meta.width || 1920;
  const srcH = meta.height || 1280;
  const orientation =
    srcW > srcH * 1.15 ? "landscape" : srcH > srcW * 1.15 ? "portrait" : "square";

  const widths = WIDTHS.filter((w) => w <= srcW);
  if (widths.length === 0) widths.push(srcW);

  const sources = [];
  for (const w of widths) {
    const out = path.join(dir, `${base}-${w}.webp`);
    const relOut = `/media/${slug}/${base}-${w}.webp`;
    sources.push({ w, src: relOut });
    if (!FORCE) {
      try {
        await fs.access(out);
        continue;
      } catch {}
    }
    await sharp(srcPath, { failOn: "none" })
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
  }

  const lqipBuf = await sharp(srcPath, { failOn: "none" })
    .rotate()
    .resize({ width: 24 })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuf.toString("base64")}`;

  return {
    id: base,
    orientation,
    w: srcW,
    h: srcH,
    ratio: +(srcW / srcH).toFixed(4),
    lqip,
    widths,
    srcset: sources.map((s) => `${s.src} ${s.w}w`).join(", "),
    src: sources[sources.length - 1].src,
    sources,
  };
}

async function main() {
  const selection = JSON.parse(await fs.readFile(SELECTION, "utf8"));
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

  const manifest = {};
  for (const [slug, files] of Object.entries(selection)) {
    console.log(`\n[${slug}] ${files.length} selected`);
    const items = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const rec = await processImage(files[i], slug, i);
        items.push(rec);
        process.stdout.write(`  ${rec.id} (${rec.orientation}) `);
      } catch (e) {
        console.warn(`\n  ! failed ${files[i]}: ${e.message}`);
      }
    }
    manifest[slug] = items;
    console.log(`\n  -> ${items.length} done`);
  }

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  const total = Object.values(manifest).reduce((s, a) => s + a.length, 0);
  console.log(`\nManifest written: ${MANIFEST} (${total} images)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
