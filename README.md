# Astro Frame Shift - Minimalist Photo Gallery

A clean, minimalist photo gallery built with Astro featuring smooth transitions, dark/light theme support, and responsive masonry layout.

This theme is **Astro 7 ready**.

## Screenshots 📸

Captured from the [live demo](https://emasuriano.github.io/astro-frame-shift/) with [shot-scraper](https://github.com/simonw/shot-scraper). Light and dark run as parallel CI jobs via [`shots-light.yml`](shots-light.yml) / [`shots-dark.yml`](shots-dark.yml) (workflow: [`.github/workflows/screenshots.yml`](.github/workflows/screenshots.yml)). Home, Category, and Image detail.

| Light | Dark |
| ----- | ---- |
| ![Home - Light](screenshots/home-light.png) | ![Home - Dark](screenshots/home-dark.png) |
| ![Category - Light](screenshots/category-light.png) | ![Category - Dark](screenshots/category-dark.png) |
| ![Image - Light](screenshots/image-light.png) | ![Image - Dark](screenshots/image-dark.png) |

## ✨ Features

- **Minimalist Design**: Clean, borderless interface with no shadows or visual clutter
- **Dark/Light Theme**: Persistent theme switching with smooth transitions
- **Responsive Masonry Layout**: CSS-based masonry layout that adapts to all screen sizes
- **Image Validation**: Build-time TypeScript script to verify all image URLs are working
- **Smooth Transitions**: Astro View Transitions for seamless navigation between pages
- **Category routes**: Filter tags are real pages (`/category/{slug}/`) so view transitions work; client-side hide broke them
- **Hover Effects**: Image information appears only on hover for maximum minimalism
- **Performance Optimized**: Static site generation with optimized images using Astro's Image component

## 🎨 Design Philosophy

This gallery embraces ultra-minimalism:

- No borders or shadows
- Clean typography with Inter and JetBrains Mono fonts
- Information only appears on hover
- Stone/slate color palette for subtle elegance
- Generous white space and clean layouts

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── ThemeToggle.astro          # Dark/light theme toggle
│   ├── content/
│   │   └── config.ts                  # Content collection schema
│   ├── data/
│   │   └── gallery.json               # 60+ curated images with metadata
│   ├── layouts/
│   │   └── Layout.astro               # Main layout with theme persistence
│   ├── pages/
│   │   ├── index.astro                # Gallery grid page
│   │   └── image/
│   │       └── [id].astro             # Individual image detail page
│   └── styles/
│       └── global.css                 # Global styles
├── scripts/
│   └── check-images.ts                # Image URL validation script
└── package.json
```

## 🖼️ Gallery Features

- **60+ Images**: Diverse collection spanning multiple categories
- **Category Organization**: Architecture, Nature, Street Photography, Portraits, and more
- **Photographer Attribution**: Credit with optional links to photographer profiles
- **Related Images**: Images can have multiple categories; related images are ranked by tag overlap
- **Responsive Images**: Optimized loading with Astro's Image component

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `yarn install`         | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn check-images`    | Validate all gallery image URLs                  |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |

## 🛠️ Development

### Adding handmade work to the gallery

1. Copy the photo into `public/gallery/`. Use a short, descriptive filename
   with no spaces, such as `blue-floral-birthday-card.jpg`.
2. Add an entry to `src/data/gallery.json`:

```json
{
  "src": "/gallery/blue-floral-birthday-card.jpg",
  "alt": "Handmade birthday card with blue flowers and a white ribbon",
  "title": "Blue Floral Birthday Card",
  "description": "A handmade birthday card decorated with layered blue paper flowers.",
  "categories": ["Cards", "Birthday"],
  "date": "2026-11-07"
}
```

Use a unique title, describe what is visible in `alt`, and add one or more
categories. The date is the creation date in `YYYY-MM-DD` format. Photographer
fields are only needed when crediting someone else.

For a video, copy both the video and a still image to `public/gallery/`, then
add `mediaType` and `poster`:

```json
{
  "src": "/gallery/paper-flower-making.mp4",
  "mediaType": "video",
  "poster": "/gallery/paper-flower-making-poster.jpg",
  "alt": "A paper flower being assembled by hand",
  "title": "Making a Paper Flower",
  "description": "A short look at assembling a layered paper flower.",
  "categories": ["Decorations", "Behind the Scenes"],
  "date": "2026-11-07"
}
```

Video detail pages include playback controls; the poster is used as the gallery
thumbnail. Keep filenames unique, and use compressed JPG/WebP photos and MP4
videos so pages remain quick to load. After adding files and entries, run
`yarn dev` to preview them and `yarn build` to validate before publishing.

### Image Validation

The project checks remote image URLs and verifies that local gallery images,
videos, and video posters exist:

- Run `yarn check-images` to verify all URLs are accessible
- Validation runs automatically during build process
- Failed URLs are reported for manual review

### Theme Customization

The project uses Tailwind CSS with a stone/slate color palette:

- Light mode: Stone colors (warm, neutral)
- Dark mode: Slate colors (cool blue-gray undertones)
- Easy to customize in `tailwind.config.mjs`

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile viewing
- **Masonry Layout**: 1-4 columns based on screen size
- **Touch Friendly**: Proper hover states and touch interactions
- **Performance**: Lazy loading and optimized images

## 🎯 Performance Features

- **Static Site Generation**: Pre-rendered for maximum speed
- **Image Optimization**: Automatic WebP conversion and responsive sizes
- **View Transitions**: Smooth navigation without full page reloads
- **Minimal JavaScript**: Theme persistence and hover effects only
- **CSS-Based Masonry**: No JavaScript dependencies for layout
