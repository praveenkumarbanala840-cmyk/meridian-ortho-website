import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { stat } from "node:fs/promises";

const ROOT = "C:/Users/u/meridian-ortho-website";

mkdirSync(`${ROOT}/src/assets`, { recursive: true });
mkdirSync(`${ROOT}/public/hero`, { recursive: true });

async function report(label, path) {
  const meta = await sharp(path).metadata();
  const { size } = await stat(path);
  console.log(`${label}: ${meta.width}x${meta.height}, ${(size / 1024).toFixed(1)} KB`);
}

// Doctor photo -> src/assets, portrait headshot, used in the About/Credibility section.
await sharp(`${ROOT}/assets/doctor-photo.jpg.png`)
  .resize({ width: 1000, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${ROOT}/src/assets/doctor-photo.jpg`);

// Body poster -> public/hero, will serve as the <video poster> for the hero rotation clip.
await sharp(`${ROOT}/assets/body-poster.jpg.png`)
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(`${ROOT}/public/hero/body-poster.jpg`);

console.log("--- source ---");
await report("doctor-photo (source)", `${ROOT}/assets/doctor-photo.jpg.png`);
await report("body-poster (source)", `${ROOT}/assets/body-poster.jpg.png`);
console.log("--- optimized ---");
await report("doctor-photo.jpg", `${ROOT}/src/assets/doctor-photo.jpg`);
await report("body-poster.jpg", `${ROOT}/public/hero/body-poster.jpg`);
