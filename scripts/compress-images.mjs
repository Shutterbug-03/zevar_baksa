/**
 * Shrinks oversized JPEG/PNG photos in public/images in place (same filenames,
 * so no code changes): max 2000px on the long edge, mozjpeg q80, EXIF-rotated,
 * sRGB. Files already under the threshold are left alone; a file is only
 * overwritten if the result is smaller. Originals live in git history.
 *
 * Run: node scripts/compress-images.mjs [dir] [--dry]
 */
import sharp from "sharp";
import { readdir, stat, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const root = path.resolve(args.find((a) => !a.startsWith("--")) ?? "public/images");
const THRESHOLD = 500 * 1024;
const MAX_EDGE = 2000;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(e.name)) yield p;
  }
}

let before = 0, after = 0, count = 0;
for await (const file of walk(root)) {
  const { size } = await stat(file);
  if (size < THRESHOLD) continue;
  const isPng = /\.png$/i.test(file);
  const pipeline = sharp(await readFile(file))
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
  const out = await (isPng
    ? pipeline.png({ compressionLevel: 9, palette: false })
    : pipeline.jpeg({ quality: 80, mozjpeg: true })
  ).toBuffer();
  if (out.length >= size) continue;
  before += size; after += out.length; count++;
  console.log(`${path.relative(process.cwd(), file)}  ${(size / 1e6).toFixed(1)}MB → ${(out.length / 1e3).toFixed(0)}KB`);
  if (!dry) await writeFile(file, out);
}
console.log(`\n${count} files, ${(before / 1e6).toFixed(0)}MB → ${(after / 1e6).toFixed(0)}MB${dry ? " (dry run)" : ""}`);
