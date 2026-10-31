import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

function walk(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir)) {
    if (item.startsWith('.')) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) files = files.concat(walk(full));
    else if (/\.(jpe?g|png)$/i.test(item)) files.push(full);
  }
  return files;
}

const targets = ["public/images", "public/logos", "public/landing-grid"];
// Also include top-level images
const topLevel = [
  "public/brand-story.jpg",
  "public/meena-bagh-bg.jpg",
  "public/hero-poster.jpg",
  "public/bento-1-needle.jpg",
  "public/bento-2-camel.jpg",
  "public/bento-3-palette.jpg",
  "public/bento-4-tweezers.jpg",
  "public/bento-5-pouring.jpg",
  "public/og-image.jpg"
].filter(f => fs.existsSync(f));

const allFiles = [...targets.flatMap(walk), ...topLevel];
console.log(`Optimizing ${allFiles.length} image files in place...`);

let totalSaved = 0;
let count = 0;

for (const f of allFiles) {
  const origSize = fs.statSync(f).size;
  const isPng = /\.png$/i.test(f);

  try {
    const pipeline = sharp(f).rotate().resize(1800, 1800, { fit: "inside", withoutEnlargement: true });
    let buf;
    if (isPng) {
      buf = await pipeline.png({ quality: 85, compressionLevel: 9, palette: true }).toBuffer();
    } else {
      buf = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    }

    if (buf.length < origSize) {
      const saved = origSize - buf.length;
      totalSaved += saved;
      count++;
      fs.writeFileSync(f, buf);
      if (saved > 200 * 1024) {
        console.log(`  ${path.relative(process.cwd(), f)}: ${(origSize/1e6).toFixed(2)}MB -> ${(buf.length/1e3).toFixed(0)}KB (saved ${(saved/1e6).toFixed(2)}MB)`);
      }
    }
  } catch (err) {
    console.warn(`  Failed ${f}: ${err.message}`);
  }
}

console.log(`\n🎉 In-place image optimization complete!`);
console.log(`Compressed ${count} files, total bandwidth saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB.`);
