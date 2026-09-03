import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#') && line.includes('=')) {
    const [key, ...value] = line.split('=');
    envVars[key.trim()] = value.join('=').trim();
  }
});

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;

if (!SUPABASE_URL || SUPABASE_URL.includes('PLACEHOLDER')) {
  console.error('❌ Error: Supabase URL is missing or placeholder in .env.local');
  process.exit(1);
}

// Remove trailing slash if present
const baseUrl = SUPABASE_URL.replace(/\/$/, '');
const MEDIA_BASE = `${baseUrl}/storage/v1/object/public/media`;

const SRC_DIR = path.join(process.cwd(), 'src');
const TARGET_EXTENSIONS = ['.ts', '.tsx', '.css'];

let modifiedCount = 0;

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  const patterns = [
    { from: /"\/images\//g, to: `"${MEDIA_BASE}/images/` },
    { from: /'\/images\//g, to: `'${MEDIA_BASE}/images/` },
    { from: /`\/images\//g, to: `\`${MEDIA_BASE}/images/` },
    
    { from: /"\/logos\//g, to: `"${MEDIA_BASE}/logos/` },
    { from: /'\/logos\//g, to: `'${MEDIA_BASE}/logos/` },
    { from: /`\/logos\//g, to: `\`${MEDIA_BASE}/logos/` },
    
    // Also CSS url()
    { from: /url\(\/images\//g, to: `url(${MEDIA_BASE}/images/` },
    { from: /url\('\/images\//g, to: `url('${MEDIA_BASE}/images/` },
    { from: /url\("\/images\//g, to: `url("${MEDIA_BASE}/images/` }
  ];

  patterns.forEach(p => {
    content = content.replace(p.from, p.to);
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

console.log(`Starting to replace local paths with: ${MEDIA_BASE}`);
walkDir(SRC_DIR);
console.log(`\n🎉 Done! Modified ${modifiedCount} files.`);
