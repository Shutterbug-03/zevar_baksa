import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

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
const SUPABASE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || SUPABASE_URL.includes('PLACEHOLDER') || SUPABASE_URL.includes('YOUR_COOLIFY')) {
  console.error('❌ Error: Supabase URL or Key is missing or placeholder in .env.local');
  console.error('Please configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

const BUCKET_NAME = 'media';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Specific directories to scan and upload
const DIRECTORIES_TO_UPLOAD = ['images', 'logos', 'landing-grid'];

// Specific standalone top-level files to upload
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

async function ensureBucketExists() {
  console.log(`Checking if bucket '${BUCKET_NAME}' exists...`);
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('❌ Failed to list buckets:', listError.message);
    process.exit(1);
  }

  const bucketExists = buckets && buckets.some(b => b.name === BUCKET_NAME);
  
  if (!bucketExists) {
    console.log(`Creating public bucket '${BUCKET_NAME}'...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 104857600, // 100MB
    });
    
    if (createError) {
      console.error('❌ Failed to create bucket:', createError.message);
      process.exit(1);
    }
    console.log(`✅ Bucket '${BUCKET_NAME}' created successfully.`);
  } else {
    console.log(`✅ Bucket '${BUCKET_NAME}' already exists. Ensuring public & limit...`);
    await supabase.storage.updateBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 104857600,
    });
  }
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.mp4':
      return 'video/mp4';
    default:
      return 'application/octet-stream';
  }
}

async function uploadFile(localPath, remotePath) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const contentType = getContentType(localPath);
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(remotePath, fileBuffer, {
        contentType,
        upsert: true,
      });
      
    if (error) {
      console.error(`❌ Failed [${remotePath}]: ${error.message}`);
      return false;
    } else {
      console.log(`✅ Uploaded: ${remotePath}`);
      return true;
    }
  } catch (err) {
    console.error(`❌ Read error [${localPath}]: ${err.message}`);
    return false;
  }
}

function walkDir(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item.startsWith('.')) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

// Concurrency pool helper
async function asyncPool(limit, items, iteratorFn) {
  const results = [];
  const executing = [];
  for (const item of items) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    results.push(p);
    if (limit <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

async function main() {
  console.log(`Connecting to Supabase at: ${SUPABASE_URL}`);
  await ensureBucketExists();

  const filesToUpload = [];

  // 1. Gather files from directories
  for (const dir of DIRECTORIES_TO_UPLOAD) {
    const fullDirPath = path.join(PUBLIC_DIR, dir);
    const files = walkDir(fullDirPath);
    for (const f of files) {
      const rel = path.relative(PUBLIC_DIR, f).split(path.sep).join('/');
      filesToUpload.push({ local: f, remote: rel });
    }
  }

  // 2. Gather top level files
  for (const file of TOP_LEVEL_FILES) {
    const fullPath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(fullPath)) {
      filesToUpload.push({ local: fullPath, remote: file });
    }
  }

  console.log(`\nFound ${filesToUpload.length} files to upload into '${BUCKET_NAME}' bucket.`);
  console.log('Uploading with concurrency 5...\n');

  let successCount = 0;
  let failCount = 0;

  await asyncPool(5, filesToUpload, async (item) => {
    const ok = await uploadFile(item.local, item.remote);
    if (ok) successCount++;
    else failCount++;
  });

  console.log(`\n========================================`);
  console.log(`Upload summary: ${successCount} succeeded, ${failCount} failed.`);
  console.log(`Supabase CDN base: ${SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/${BUCKET_NAME}/`);
  console.log(`========================================\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
