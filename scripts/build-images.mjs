// LUMENDE image pipeline
// Selects an even spread of edited JPGs from the photographer's library,
// emits responsive WebP + a tiny blurred LQIP, and writes a manifest.
//
// Re-runnable and incremental: an already-emitted derivative is skipped.
// Usage: node scripts/build-images.mjs [--force]

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_ROOT = "C:/Users/Admin/Desktop/Fotos organizadas";
const OUT_DIR = path.resolve("public/media");
const MANIFEST = path.resolve("src/data/media.json");
const WIDTHS = [400, 800, 1280, 1920];
const QUALITY = 80;
const FORCE = process.argv.includes("--force");

// slug -> { folders:[relative dirs], count }
const PLAN = {
  nightmare: { folders: ["Terror", "FIlmake/Fotos pesadilla/a"], count: 16 },
  fera: { folders: ["ALIEN/alienhada edit"], count: 12 },
  afterimage: { folders: ["proyecto Dream/aasd/listas", "proyecto Dream/Onirico"], count: 18 },
  nocturne: { folders: ["Japon/a"], count: 12 },
  experiments: { folders: ["X", "witch", "yoga/a", "Vilmora/a"], count: 20 },
  commissions: { folders: ["FER", "Jocelyn x", "pintores/a"], count: 14 },
};

const isJpg = (f) => /\.jpe?g$/i.test(f);
const ignoreDir = (d) => /lrdata|lrcat|previews/i.test(d);

async function listJpgs(dir) {
  const abs = path.join(SRC_ROOT, dir);
  let entries = [];
  try {
    entries = await fs.readdir(abs, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((e) => e.isFile() && isJpg(e.name))
    .map((e) => path.join(abs, e.name))
    .sort();
}

// Even spread of n items across an array.
function spread(arr, n) {
  if (arr.length <= n) return arr;
  const out = [];
  const step = arr.length / n;
  for (let i = 0; i < n; i++) out.push(arr[Math.floor(i * step)]);
  return out;
}

async function selectFor(plan) {
  // Round-robin across folders so multi-folder projects mix sources.
  const perFolder = await Promise.all(plan.folders.map(listJpgs));
  const target = plan.count;
  const picks = [];
  // Distribute target across folders proportionally to their size.
  const total = perFolder.reduce((s, a) => s + a.length, 0) || 1;
  perFolder.forEach((files, i) => {
    const share = Math.max(
      1,
      Math.round((files.length / total) * target)
    );
    for (const f of spread(files, share)) picks.push(f);
  });
  return spread(picks, target);
}

async function processImage(srcPath, slug, index) {
  const base = `${slug}-${String(index + 1).padStart(2, "0")}`;
  const dir = path.join(OUT_DIR, slug);
  await fs.mkdir(dir, { recursive: true });

  const img = sharp(srcPath, { failOn: "none" }).rotate(); // respect EXIF orientation
  const meta = await img.metadata();
  const srcW = meta.width || 1920;
  const srcH = meta.height || 1280;
  const orientation =
    srcW > srcH * 1.15 ? "landscape" : srcH > srcW * 1.15 ? "portrait" : "square";

  const widths = WIDTHS.filter((w) => w <= srcW);
  if (widths.length === 0) widths.push(srcW);

  const sources = [];
  for (const w of widths) {
    const out = path.join(dir, `${base}-${w}.webp`);
    const rel = `/media/${slug}/${base}-${w}.webp`;
    sources.push({ w, src: rel });
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

  // LQIP: tiny blurred base64 WebP
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
    src: sources[sources.length - 1].src, // largest as default
    sources,
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

  const manifest = {};
  for (const [slug, plan] of Object.entries(PLAN)) {
    const picks = await selectFor(plan);
    console.log(`\n[${slug}] selected ${picks.length} images`);
    const items = [];
    for (let i = 0; i < picks.length; i++) {
      try {
        const rec = await processImage(picks[i], slug, i);
        items.push(rec);
        process.stdout.write(`  ${rec.id} (${rec.orientation}) `);
      } catch (e) {
        console.warn(`\n  ! failed ${picks[i]}: ${e.message}`);
      }
    }
    manifest[slug] = items;
    console.log(`\n  -> ${items.length} done`);
  }

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  const totalImgs = Object.values(manifest).reduce((s, a) => s + a.length, 0);
  console.log(`\nManifest written: ${MANIFEST} (${totalImgs} images)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
