#!/usr/bin/env tsx

import fs from 'fs';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import path from 'path';

interface GalleryImage {
  id: string;
  src: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt: string;
  title: string;
  description: string;
  categories: string[];
  date: string;
  photographer?: string;
  photographerLink?: string;
}

interface ValidationResult {
  id: string;
  title: string;
  url: string;
  status: number;
  ok: boolean;
  error?: string;
}

// Read the gallery data
const galleryData: GalleryImage[] = JSON.parse(
  fs.readFileSync('./src/data/gallery.json', 'utf8')
);

console.log(`\n🔍 Checking ${galleryData.length} image URLs...\n`);

async function checkImageUrl(imageData: GalleryImage): Promise<ValidationResult> {
  const mediaPaths = [
    { label: imageData.mediaType === 'video' ? 'video' : 'image', src: imageData.src },
    ...(imageData.mediaType === 'video' && imageData.poster
      ? [{ label: 'poster', src: imageData.poster }]
      : []),
  ];

  const checks = await Promise.all(mediaPaths.map(async ({ label, src }) => {
    if (src.startsWith('/')) {
      const localPath = path.resolve(process.cwd(), 'public', src.slice(1));
      const exists = fs.existsSync(localPath);
      console.log(
        `${exists ? '✅' : '❌'} ${imageData.title} (${label}) - ${
          exists ? 'local media found' : 'file not found'
        }`,
      );
      return exists;
    }

    let url: URL;
    try {
      url = new URL(src);
    } catch (error) {
      console.error(`❌ ${imageData.title} (${label}) - invalid URL: ${src}`, error);
      return false;
    }
    const client = url.protocol === 'https:' ? https : http;

    return new Promise<boolean>((resolve) => {
      const req = client.request(url, { method: 'HEAD' }, (res) => {
        const status = res.statusCode || 0;
        const isOk = status >= 200 && status < 300;

        console.log(
          `${isOk ? '✅' : '❌'} ${imageData.title} (${label}) - ${status} ${
            res.statusMessage || 'Unknown'
          }`,
        );
        resolve(isOk);
      });

      req.on('error', (err: Error) => {
        console.log(`❌ ${imageData.title} (${label}) - ERROR: ${err.message}`);
        resolve(false);
      });

      req.setTimeout(10000, () => {
        console.log(`⏰ ${imageData.title} (${label}) - TIMEOUT`);
        req.destroy();
        resolve(false);
      });

      req.end();
    });
  }));
  const ok = checks.every(Boolean);

  return {
    id: imageData.id,
    title: imageData.title,
    url: imageData.src,
    status: ok ? 200 : 0,
    ok,
    error: ok ? undefined : 'One or more media files or URLs failed validation',
  };
}

// Main validation function
async function validateImages(): Promise<void> {
  try {
    // Check all images
    const results = await Promise.all(
      galleryData.map(checkImageUrl)
    );

    // Summary
    const successful = results.filter(r => r.ok);
    const failed = results.filter(r => !r.ok);

    console.log(`\n📊 Summary:`);
    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);

    if (failed.length > 0) {
      console.log(`\n❌ Failed images:`);
      failed.forEach(f => {
        console.log(`  - ID ${f.id}: ${f.title}`);
        console.log(`    URL: ${f.url}`);
        if (f.error) console.log(`    Error: ${f.error}`);
      });
    }

    console.log(`\n✨ Check complete!\n`);

    // Exit with error if any images failed
    process.exit(failed.length > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Error during validation:', error);
    process.exit(1);
  }
}

// Run validation
validateImages();