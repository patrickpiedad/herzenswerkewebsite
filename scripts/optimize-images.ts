#!/usr/bin/env tsx

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { optimizedGalleryImageSrc } from '../src/utils/gallery-images';

interface GalleryImage {
  src: string;
  mediaType?: 'image' | 'video';
  poster?: string;
}

const publicDir = path.resolve('public');
const galleryDir = path.join(publicDir, 'gallery');
const outputDir = path.join(publicDir, 'gallery-optimized');
const galleryData: GalleryImage[] = JSON.parse(
  await fs.readFile('src/data/gallery.json', 'utf8'),
);
const imageSources = new Set(
  galleryData.flatMap((image) => [
    ...(image.mediaType === 'video' ? [] : [image.src]),
    ...(image.poster ? [image.poster] : []),
  ]).filter((src) => src.startsWith('/gallery/')),
);

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });

for (const src of imageSources) {
  const optimizedSrc = optimizedGalleryImageSrc(src);
  if (optimizedSrc === src) {
    throw new Error(`Could not create an optimized path for ${src}`);
  }

  const sourcePath = path.resolve(publicDir, `.${src}`);
  const outputPath = path.resolve(publicDir, `.${optimizedSrc}`);
  const sourceRelativePath = path.relative(galleryDir, sourcePath);
  const outputRelativePath = path.relative(outputDir, outputPath);
  if (
    sourceRelativePath.startsWith('..') ||
    path.isAbsolute(sourceRelativePath) ||
    outputRelativePath.startsWith('..') ||
    path.isAbsolute(outputRelativePath)
  ) {
    throw new Error(`Gallery image path is outside the expected directory: ${src}`);
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const result = await sharp(sourcePath)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);

  console.log(
    `${src} -> ${optimizedSrc} (${Math.round(result.size / 1024)} KB)`,
  );
}

console.log(`Optimized ${imageSources.size} gallery images as WebP.`);
