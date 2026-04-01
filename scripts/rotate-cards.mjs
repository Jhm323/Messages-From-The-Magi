// This script was used to rotate the cards systmatically. It can be deleted but will be kept here if any other images are re-processed.

import sharp from "sharp";
import { readdirSync } from "fs";
import { join } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const cardsDir = join(__dirname, "../public/images/cards");

// Cards that need 270° instead of 90° (visually upside-down when shot)
const rotate270 = new Set(["19_6_of_clubs.jpg"]);

const files = readdirSync(cardsDir).filter(
  (f) => f.endsWith(".jpg") && f !== "53_joker.jpg",
);

for (const file of files) {
  const filePath = join(cardsDir, file);
  const degrees = rotate270.has(file) ? 270 : 90;
  const tmpPath = filePath + ".tmp.jpg";

  await sharp(filePath).rotate(degrees).jpeg({ quality: 92 }).toFile(tmpPath);

  // Replace original with rotated version
  const { rename } = await import("fs/promises");
  await rename(tmpPath, filePath);

  console.log(`✓ ${file} (${degrees}°)`);
}

console.log(`\nDone — ${files.length} cards processed.`);
