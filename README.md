# Herzens Werke

A portfolio of handmade cards, decorations, and other crafts. The gallery is
for sharing examples and inspiration; it does not take orders or payments.

The site is available in English and German. Use the `DE` / `EN` button in the
header to switch languages; the selection is remembered as you browse.

## Run locally

```sh
yarn install
yarn dev
```

Open the local address printed by Astro to preview the site. Before publishing,
run:

```sh
yarn build
```

The build checks gallery media and creates the static site in `dist/`.

## Add a creation to the gallery

1. Copy a web-sized photo into `public/gallery/` (for example,
   `blue-floral-card.jpg`).
2. Add an entry to `src/data/gallery.json`:

```json
{
  "src": "/gallery/blue-floral-card.jpg",
  "alt": "Handmade birthday card with blue flowers and a white ribbon",
  "title": "Blue Floral Birthday Card",
  "description": "A handmade birthday card decorated with layered blue paper flowers.",
  "mainCategory": "Cards",
  "tags": ["Birthday"],
  "translations": {
    "de": {
      "title": "Bunte Geburtstagskarte",
      "alt": "Handgemachte Geburtstagskarte mit blauen Blumen",
      "description": "Eine handgemachte Karte mit liebevoll gestalteten blauen Papierblumen."
    }
  },
  "date": "2026-11-07"
}
```

Use a unique title, describe the visible details in `alt`, choose one main
category (`Cards`, `Decorations`, or `Jewelry`), and add any useful tags. Tags
are discovered from the items in that main category, so add tags freely without
maintaining a separate tag list. The Home page always shows every item in a
random order; selecting a main category or tag filters the gallery. Keep the
original full-resolution photo separately; a resized JPG or WebP loads faster.
The available main categories and their display text are defined in
`src/data/mainCategories.ts`; add a category there when a new kind of work is
introduced. Tags such as `Birthday`, `Christmas`, or `Living Room` are free-form
and only appear as filters for the main category where they are used.
The German labels for common tags are in `src/utils/tags.ts`; add a German label
there for each new tag. Add German `title`, `alt`, and `description` values in
`translations.de` for each creation.

### Add a video

Place an MP4 and a thumbnail image in `public/gallery/`. Add an entry like:

```json
{
  "src": "/gallery/paper-flower-making.mp4",
  "mediaType": "video",
  "poster": "/gallery/paper-flower-making-poster.jpg",
  "alt": "A paper flower being assembled by hand",
  "title": "Making a Paper Flower",
  "description": "A short look at assembling a layered paper flower.",
  "mainCategory": "Decorations",
  "tags": ["Behind the Scenes"],
  "date": "2026-11-07"
}
```

The poster appears in the gallery, and the video plays on its detail page.
Run `yarn dev` to preview new entries and `yarn build` to check that the media
files exist.

## Contact

The contact form uses Netlify Forms. To receive messages by email:

1. Deploy the site through the existing Netlify setup. The build command is
   `yarn build`, and the publish directory is `dist`.
2. After a successful deploy, open the site's **Forms** area in Netlify and
   confirm the `contact` form has been detected.
3. Add an email notification for that form and enter the address that should
   receive inquiries (for example, `info@herzens-werke.com`).

The form submits the visitor's name, email, optional gallery example, and
message to Netlify. The success page is shown after submission. Netlify Forms
does not process submissions when viewed through the local development server.

## Add a portrait to the About page

Put a web-sized portrait photo at `public/about/portrait.jpg`. The About page
will show it automatically; until then, it displays a placeholder. A JPG or
WebP photo around 1600 pixels tall is a good size.

## License

See [LICENSE.md](./LICENSE.md) for the license included with this project.
