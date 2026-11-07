export function tagsOf(img: { tags?: string[] }): string[] {
  return Array.isArray(img.tags) ? img.tags : [];
}

export function formatMainCategoryAndTags(img: {
  mainCategory: string;
  tags?: string[];
}): string {
  return [img.mainCategory, ...tagsOf(img)].join(' · ');
}
