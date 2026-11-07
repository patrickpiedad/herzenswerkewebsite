import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const gallery = defineCollection({
  loader: file("src/data/gallery.json", {
    parser: (text) => {
      const data = JSON.parse(text);
      return data.map((item: any) => ({
        ...item,
        id: slugify(item.title),
      }));
    },
  }),
  schema: z.object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
    description: z.string(),
    mainCategory: z.string(),
    tags: z.array(z.string()).default([]),
    date: z.string(),
    mediaType: z.enum(["image", "video"]).optional(),
    poster: z.string().optional(),
    photographer: z.string().optional(),
    photographerLink: z.string().optional(),
  }).refine((item) => item.mediaType !== "video" || Boolean(item.poster), {
    message: "Video gallery items must include a poster image.",
    path: ["poster"],
  }),
});

export const collections = { gallery };
