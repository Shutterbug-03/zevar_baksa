import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

// Global polyfill for Node.js 20
global.WebSocket = WebSocket;

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
const SUPABASE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || SUPABASE_URL.includes('PLACEHOLDER') || SUPABASE_KEY.includes('PLACEHOLDER')) {
  console.error('❌ Error: Supabase URL or Service Role Key is missing or placeholder in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

const BUCKET_NAME = 'media';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DIRECTORIES_TO_UPLOAD = ['images', 'logos'];

async function ensureBucketExists() {
  console.log(`Checking if bucket '${BUCKET_NAME}' exists...`);
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('❌ Failed to list buckets:', listError);
    process.exit(1);
  }

  const bucketExists = buckets.some(b => b.name === BUCKET_NAME);
  
  if (!bucketExists) {
    console.log(`Creating public bucket '${BUCKET_NAME}'...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    });
    
    if (createError) {
      console.error('❌ Failed to create bucket:', createError);
      process.exit(1);
    }
    console.log(`✅ Bucket '${BUCKET_NAME}' created successfully.`);
  } else {
    console.log(`✅ Bucket '${BUCKET_NAME}' already exists. Updating limit to 50MB...`);
    await supabase.storage.updateBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 52428800,
    });
  }
}

async function uploadFile(localPath, remotePath) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    let contentType = 'application/octet-stream';
    if (localPath.endsWith('.jpg') || localPath.endsWith('.jpeg')) contentType = 'image/jpeg';
    else if (localPath.endsWith('.png')) contentType = 'image/png';
    else if (localPath.endsWith('.svg')) contentType = 'image/svg+xml';
    else if (localPath.endsWith('.webp')) contentType = 'image/webp';
    
    console.log(`Uploading ${remotePath}...`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(remotePath, fileBuffer, {
        contentType,
        upsert: true,
      });
      
    if (error) {
      console.error(`❌ Failed to upload ${remotePath}:`, error.message);
    } else {
      console.log(`✅ Uploaded ${remotePath}`);
    }
  } catch (err) {
    console.error(`❌ Error reading file ${localPath}:`, err.message);
  }
}

async function walkDir(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(await walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  await ensureBucketExists();

  for (const dir of DIRECTORIES_TO_UPLOAD) {
    const fullDirPath = path.join(PUBLIC_DIR, dir);
    if (!fs.existsSync(fullDirPath)) {
      console.log(`⚠️ Directory not found: ${fullDirPath}`);
      continue;
    }

    console.log(`\nScanning directory: ${dir}...`);
    const files = await walkDir(fullDirPath);
    
    for (const file of files) {
      if (path.basename(file).startsWith('.')) continue;
      const relativePath = path.relative(PUBLIC_DIR, file);
      // Ensure posix path separator for Supabase storage
      const remotePath = relativePath.split(path.sep).join('/');
      await uploadFile(file, remotePath);
    }
  }
  
  console.log('\n🎉 All media uploaded successfully!');
}

main();
