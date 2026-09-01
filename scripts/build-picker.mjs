// LUMENDE — visual photo picker generator
// Scans the mapped source folders, makes small webp thumbnails, and writes a
// manifest.js (window.PICKER = {...}) + index.html the user opens locally to
// choose photos per project and set custom titles.
//
// Output: ./picker/  (gitignored, local only)
// Usage: node scripts/build-picker.mjs [--per 150]

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_ROOT = "C:/Users/Admin/Desktop/Fotos organizadas";
const OUT = path.resolve("picker");
const THUMBS = path.join(OUT, "thumbs");
const THUMB_W = 340;
const perArg = process.argv.indexOf("--per");
const PER = perArg > -1 ? Number(process.argv[perArg + 1]) : 160;

// project -> source folders (relative to SRC_ROOT), + current defaults
const PLAN = {
  nightmare: {
    label: "NIGHTMARE",
    folders: ["Terror", "FIlmake/Fotos pesadilla/a"],
    title: "Nightmare",
    year: "2026",
    category: "Editorial / Experimental Photography",
    concept: "A visual exploration of dreams, distortion and artificial light.",
  },
  fera: {
    label: "FERA",
    folders: ["ALIEN/alienhada edit"],
    title: "Fera",
    year: "2026",
    category: "Fashion / Fine Art Photography",
    concept: "The human figure dissolving into something feral.",
  },
  afterimage: {
    label: "AFTERIMAGE",
    folders: ["proyecto Dream/aasd/listas", "proyecto Dream/Onirico"],
    title: "Afterimage",
    year: "2026",
    category: "Long Exposure / Experimental Photography",
    concept: "What the eye keeps after the light has gone.",
  },
  nocturne: {
    label: "NOCTURNE",
    folders: ["Japon/a"],
    title: "Nocturne",
    year: "2026",
    category: "Photography / Motion",
    concept: "Stillness recorded in the hours the world forgets.",
  },
  experiments: {
    label: "EXPERIMENTS",
    folders: ["X", "witch", "yoga/a", "Vilmora/a"],
    title: "Experiments",
    year: "",
    category: "",
    concept: "",
  },
  commissions: {
    label: "COMMISSIONS",
    folders: ["FER", "Jocelyn x", "pintores/a"],
    title: "Commissions",
    year: "",
    category: "",
    concept: "",
  },
};

const isJpg = (f) => /\.jpe?g$/i.test(f);

async function listJpgs(dir) {
  const abs = path.join(SRC_ROOT, dir);
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && isJpg(e.name))
      .map((e) => ({ folder: dir, file: e.name, abs: path.join(abs, e.name) }))
      .sort((a, b) => a.file.localeCompare(b.file));
  } catch {
    return [];
  }
}

function spread(arr, n) {
  if (arr.length <= n) return arr;
  const out = [];
  const step = arr.length / n;
  for (let i = 0; i < n; i++) out.push(arr[Math.floor(i * step)]);
  return out;
}

async function main() {
  await fs.mkdir(THUMBS, { recursive: true });
  const manifest = {};
  let made = 0;

  for (const [slug, plan] of Object.entries(PLAN)) {
    const perFolder = await Promise.all(plan.folders.map(listJpgs));
    const total = perFolder.reduce((s, a) => s + a.length, 0) || 1;
    let picks = [];
    perFolder.forEach((files) => {
      const share = Math.max(1, Math.round((files.length / total) * PER));
      picks = picks.concat(spread(files, share));
    });
    picks = spread(picks, PER);

    await fs.mkdir(path.join(THUMBS, slug), { recursive: true });
    const items = [];
    for (let i = 0; i < picks.length; i++) {
      const p = picks[i];
      // unique id from folder+file
      const id = `${slug}-${String(i).padStart(3, "0")}`;
      const thumbRel = `thumbs/${slug}/${id}.webp`;
      const thumbAbs = path.join(OUT, thumbRel);
      try {
        await fs.access(thumbAbs);
      } catch {
        try {
          await sharp(p.abs, { failOn: "none" })
            .rotate()
            .resize({ width: THUMB_W, withoutEnlargement: true })
            .webp({ quality: 70 })
            .toFile(thumbAbs);
          made++;
        } catch (e) {
          console.warn(`skip ${p.abs}: ${e.message}`);
          continue;
        }
      }
      // relative source path (from SRC_ROOT) so the user can tell me exactly
      items.push({
        id,
        thumb: thumbRel,
        folder: p.folder,
        file: p.file,
        rel: `${p.folder}/${p.file}`,
      });
    }
    manifest[slug] = {
      label: plan.label,
      defaults: {
        title: plan.title,
        year: plan.year,
        category: plan.category,
        concept: plan.concept,
      },
      count: items.length,
      items,
    };
    console.log(`[${slug}] ${items.length} candidates`);
  }

  await fs.writeFile(
    path.join(OUT, "manifest.js"),
    `window.PICKER = ${JSON.stringify(manifest)};\n`
  );
  console.log(`\nThumbnails made this run: ${made}`);
  console.log(`Open: ${path.join(OUT, "index.html")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
