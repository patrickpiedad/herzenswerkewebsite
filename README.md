# Herzens Werke

A portfolio of handmade cards, decorations, and other crafts. The gallery is
for sharing examples and inspiration; it does not take orders or payments.

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
  "categories": ["Cards", "Birthday"],
  "date": "2026-11-07"
}
```

Use a unique title, describe the visible details in `alt`, and add one or more
categories. Keep the original full-resolution photo separately; for the
website, a resized JPG or WebP is usually quicker to load.

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
  "categories": ["Decorations", "Behind the Scenes"],
  "date": "2026-11-07"
}
```

The poster appears in the gallery, and the video plays on its detail page.
Run `yarn dev` to preview new entries and `yarn build` to check that the media
files exist.

## Contact

The contact form uses Netlify Forms. To receive messages by email:

1. Connect this GitHub repository to a Netlify site and deploy it there. Use
   `yarn build` as the build command and `dist` as the publish directory.
2. After the first successful deploy, open the site's **Forms** area in Netlify
   and confirm the `contact` form has been detected.
3. Add an email notification for that form and enter the address that should
   receive enquiries (for example, `info@herzens-werke.com`).

The form submits the visitor's name, email, optional gallery example, and
message to Netlify. The success page is shown after submission. Netlify Forms
does not process submissions when the site is only hosted on GitHub Pages or
viewed through the local development server.

## Add a portrait to the About page

Put a web-sized portrait photo at `public/about/portrait.jpg`. The About page
will show it automatically; until then, it displays a placeholder. A JPG or
WebP photo around 1600 pixels tall is a good size.

## License

See [LICENSE.md](./LICENSE.md) for the license included with this project.
