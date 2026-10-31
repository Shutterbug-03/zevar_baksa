import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local not found');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
    const [key, ...value] = trimmed.split('=');
    envVars[key.trim()] = value.join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;

if (!SUPABASE_URL || SUPABASE_URL.includes('PLACEHOLDER') || SUPABASE_URL.includes('YOUR_COOLIFY')) {
  console.error('❌ Error: Supabase URL is missing or placeholder in .env.local');
  console.error('Please configure NEXT_PUBLIC_SUPABASE_URL before replacing URLs.');
  process.exit(1);
}

// Remove trailing slash if present
const baseUrl = SUPABASE_URL.replace(/\/$/, '');
const MEDIA_BASE = `${baseUrl}/storage/v1/object/public/media`;

const SRC_DIR = path.join(process.cwd(), 'src');
const TARGET_EXTENSIONS = ['.ts', '.tsx', '.css'];

let modifiedCount = 0;

const TOP_LEVEL_FILES = [
  'brand-story.jpg',
  'meena-bagh-bg.jpg',
  'hero-poster.jpg',
  'hero-video.mp4',
  'hero-video-mobile.mp4',
  'bento-1-needle.jpg',
  'bento-2-camel.jpg',
  'bento-3-palette.jpg',
  'bento-4-tweezers.jpg',
  'bento-5-pouring.jpg',
  'og-image.jpg',
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace existing old supabase storage URLs if any
  // e.g. https://[anything].supabase.co/storage/v1/object/public/media or old coolify domain
  content = content.replace(
    /https?:\/\/[a-zA-Z0-9.-]+(?::[0-9]+)?\/storage\/v1\/object\/public\/media/g,
    MEDIA_BASE
  );

  // 2. Replace directories: /images/, /logos/, /landing-grid/
  // Match only when not preceded by http/https or another domain
  const dirs = ['images', 'logos', 'landing-grid'];
  dirs.forEach(dir => {
    // String quotes: " / ' / `
    content = content.replace(new RegExp(`(["'\`])\\/${dir}\\/`, 'g'), `$1${MEDIA_BASE}/${dir}/`);
    // CSS url()
    content = content.replace(new RegExp(`url\\((["']?)\\/${dir}\\/`, 'g'), `url($1${MEDIA_BASE}/${dir}/`);
  });

  // 3. Replace top-level assets: /hero-video.mp4, /brand-story.jpg, etc.
  TOP_LEVEL_FILES.forEach(file => {
    content = content.replace(new RegExp(`(["'\`])\\/${file.replace('.', '\\.')}(["'\`])`, 'g'), `$1${MEDIA_BASE}/${file}$2`);
    content = content.replace(new RegExp(`url\\((["']?)\\/${file.replace('.', '\\.')}(["']?)\\)`, 'g'), `url($1${MEDIA_BASE}/${file}$2)`);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
    modifiedCount++;
  }
}

function walkDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else {
      if (TARGET_EXTENSIONS.some(ext => fullPath.endsWith(ext))) {
        replaceInFile(fullPath);
      }
    }
  }
}

console.log(`Replacing local paths in src/ with: ${MEDIA_BASE}`);
walkDir(SRC_DIR);
console.log(`\n🎉 Done! Modified ${modifiedCount} files.`);
