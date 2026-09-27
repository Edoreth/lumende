// Genera favicon.ico, icon.png y apple-icon.png: destello de luz (lumen) sobre negro.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="halo" cx="32" cy="32" r="26" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3e6c8" stop-opacity=".7"/>
      <stop offset=".35" stop-color="#e8d2a6" stop-opacity=".16"/>
      <stop offset="1" stop-color="#e8d2a6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="core" cx="32" cy="32" r="7" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f1e9dc"/>
    </radialGradient>
  </defs>
  <rect width="64" height="64" fill="#060606"/>
  <circle cx="32" cy="32" r="26" fill="url(#halo)"/>
  <path fill="url(#core)" d="M32 5 C32.5 27 34 31.5 59 32 C34 32.5 32.5 37 32 59 C31.5 37 30 32.5 5 32 C30 31.5 31.5 27 32 5 Z"/>
  <path fill="#f1e9dc" opacity=".5" d="M32 18 C32.4 30 33 31.6 46 32 C33 32.4 32.4 34 32 46 C31.6 34 31 32.4 18 32 C31 31.6 31.6 30 32 18 Z" transform="rotate(45 32 32)"/>
  <circle cx="32" cy="32" r="4.2" fill="#ffffff"/>
</svg>`;
const png = (s) => sharp(Buffer.from(svg), { density: 600 }).resize(s, s).png().toBuffer();

writeFileSync("src/app/icon.svg", svg);
writeFileSync("src/app/icon.png", await png(512));
writeFileSync("src/app/apple-icon.png", await png(180));

// ICO con PNGs embebidos (16/32/48)
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map(png));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let off = head.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  head.writeUInt8(s, e); head.writeUInt8(s, e + 1);
  head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
  head.writeUInt32LE(imgs[i].length, e + 8); head.writeUInt32LE(off, e + 12);
  off += imgs[i].length;
});
writeFileSync("src/app/favicon.ico", Buffer.concat([head, ...imgs]));
console.log("ok");
