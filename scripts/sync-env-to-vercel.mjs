import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('No .env.local file found');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

const envsToSync = {};

lines.forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) return;
  const [key, ...rest] = trimmed.split('=');
  const val = rest.join('=').trim();
  envsToSync[key.trim()] = val;
});

const targets = ['production', 'preview', 'development'];

for (const [key, val] of Object.entries(envsToSync)) {
  for (const target of targets) {
    try {
      console.log(`Setting ${key} for ${target}...`);
      // Escape double quotes and backslashes in val
      const escapedVal = val.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      execSync(`vercel env add ${key} ${target} --value "${escapedVal}" --force --yes`, {
        stdio: 'pipe'
      });
      console.log(`✅ ${key} (${target}) set successfully`);
    } catch (err) {
      console.warn(`⚠️ Failed to set ${key} for ${target}:`, err.message);
    }
  }
}

console.log('\n🎉 All environment variables pushed to Vercel!');
