export function tagsOf(img: { tags?: string[] }): string[] {
  return Array.isArray(img.tags) ? img.tags : [];
}

export function formatMainCategoryAndTags(img: {
  mainCategory: string;
  tags?: string[];
}): string {
  return [img.mainCategory, ...tagsOf(img)].join(' · ');
}

const germanTags: Record<string, string> = {
  Birthday: 'Geburtstag',
  Christmas: 'Weihnachten',
  Everyday: 'Für jeden Tag',
  Graduation: 'Abschluss',
  'Happy New Year': 'Frohes neues Jahr',
  'Behind the Scenes': 'Ein Blick hinter die Kulissen',
  Kitchen: 'Küche',
  'Living Room': 'Wohnzimmer',
  Outdoors: 'Draußen',
};

const germanCategories: Record<string, string> = {
  Cards: 'Karten',
  Decorations: 'Dekoration',
  Jewelry: 'Schmuck',
};

export function germanTag(tag: string): string {
  return germanTags[tag] ?? tag;
}

export function germanCategory(category: string): string {
  return germanCategories[category] ?? category;
}

export function germanMainCategoryAndTags(img: {
  mainCategory: string;
  tags?: string[];
}): string {
  return [germanCategory(img.mainCategory), ...tagsOf(img).map(germanTag)].join(' · ');
}
