// Genera favicon.ico, icon.png y apple-icon.png (marca "L" Bodoni sobre negro).
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#060606"/>
  <g fill="#e8e6e1">
    <rect x="17" y="14" width="21" height="2.2"/>
    <rect x="23" y="14" width="9" height="36"/>
    <rect x="17" y="47.8" width="31" height="2.2"/>
    <path d="M40 50 L48 50 L48 38 L46.9 38 Q46.6 45.5 40 48.6 Z"/>
  </g>
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
