// src/types.ts
export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  mainCategory: string;
  tags: string[];
  date: string;
  mediaType?: 'image' | 'video';
  poster?: string;
}
