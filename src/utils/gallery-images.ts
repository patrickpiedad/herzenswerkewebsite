export function optimizedGalleryImageSrc(src: string): string {
  if (!src.startsWith('/gallery/')) return src;
  return src.replace(/^\/gallery\//, '/gallery-optimized/').replace(/\.[^/.]+$/, '.webp');
}
