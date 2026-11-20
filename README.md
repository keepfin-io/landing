<p align="center">
  <img src="public/brand/keepfin-dark.svg" alt="Keepfin" width="200">
</p>

<h1 align="center">Keepfin landing page</h1>

<p align="center">
  The site at <a href="https://keepfin.io">keepfin.io</a> for <a href="https://github.com/keepfin-io/keepfin.io">Keepfin</a>,
  an open-source portfolio and finance tracker written in Go.<br>
  Static Astro site, Turkish and English, built with the taste-skill design kit, deployed on Cloudflare Pages.
</p>

## Pages

| URL | Page |
| --- | --- |
| `/tr/` | Turkish |
| `/en/` | English |
| `/` | Picks the language and redirects |
| `/404.html` | Not found (both languages, not indexed) |

`/` sends the visitor to the language chosen before in the header's language menu (the `lang` cookie), else
to the first Turkish or English entry in the browser's `Accept-Language`, else to English. On Cloudflare Pages
`functions/index.js` does this with a 302 before any HTML loads; `src/pages/index.astro` does the same in
the browser elsewhere (local preview, other hosts). Search engines see `/` as the `x-default` and find both
pages through `hreflang` links and the sitemap.

## Quick start

Requires Node.js 26 or newer (`.nvmrc`). Built with Astro 7.

```sh
npm install
npm run dev            # http://localhost:4321
npm run build          # static site in dist/
npm start              # serves dist/ on port 4321
npm run brand-assets   # regenerate logos and icons from public/brand/*.svg
```

The build downloads the Chivo fonts once (Astro Fonts API) and renders the social cards, so it needs network
access the first time.

## Deploy (Cloudflare Pages)

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | the repository root (so `functions/` is picked up) |
| Node.js | from `.nvmrc` (26) |
| Optional env | `PUBLIC_GOOGLE_SITE_VERIFICATION`, `PUBLIC_BING_SITE_VERIFICATION` |

`public/_headers` sets caching (hashed `/_astro/*` for a year, HTML always revalidated) and security headers;
`public/_redirects` adds the trailing slash to `/tr` and `/en`.

After the first deploy, outside the code:

1. Redirect `www.keepfin.io` and `landing.tariksogukpinar.dev` to `https://keepfin.io` with a 301
   (Cloudflare Bulk Redirects).
2. Verify the domain in Google Search Console and Bing Webmaster Tools and submit
   `https://keepfin.io/sitemap-index.xml`.
3. Set the GitHub repository's website to `https://keepfin.io`.
4. Check a page in Google's Rich Results Test and a social card preview.

## Project structure

```text
src/
  components/Landing.astro    The page: nav, sections, footer, structured data
  components/SEO.astro        Every head tag for search and sharing (one place)
  i18n/ui.ts                  All copy in Turkish and English, links, language helpers (astro:i18n)
  pages/[lang]/index.astro    The landing page for each language (/tr/, /en/)
  pages/index.astro           Language picker at /
  pages/404.astro             Not found
  pages/og/[lang].png.ts      Social card per language, 1200 x 630, rendered at build (satori + resvg)
  pages/robots.txt.ts         robots.txt from the configured site
  pages/llms.txt.ts           Plain-text summary for AI assistants (llmstxt.org)
  styles/kit/                 taste-skill kit stylesheets (bundled and inlined by Astro); do not edit
  styles/palette.css          Keepfin colours and fonts for the kit
  styles/keepfin.css          Page CSS: hero window, app frame, teal ground, language menu, glyphs
  assets/brand/               Logo sources for astro:assets <Image> (webp at 1x and 2x)
  assets/icons/               Interface glyphs (Lucide, via the kit's icons.mjs)
functions/index.js            Cloudflare Pages Function for /
scripts/brand-assets.mjs      Builds the logo sources and the icon set from public/brand/*.svg
public/
  assets/                     taste-skill kit scripts and runtime parts; do not edit
  brand/                      Keepfin logo SVGs, copied from keepfin.io/web/public/brand
  icons/                      favicon, apple-touch-icon and web manifest icons
  flags/                      Language flags (Turkish and UK)
  _headers, _redirects        Cloudflare Pages configuration
  site.webmanifest, favicon.ico
```

## Editing copy

All text lives in `src/i18n/ui.ts`. The `tr` object is the source of truth and `en` must have the same
shape, so TypeScript flags a missing key.

- Describe only what the keepfin.io Go API supports (`pkg/routes`, `app/controllers`). Features still open in
  `docs/wealth-implementation.md` go under the roadmap's "in development" column, not in the feature cards.
- Titles stay under 60 characters and descriptions under 155, with the main phrase first.
- Keep the hero `h1` within 48 characters so it stays on three lines.
- Buttons are a verb plus an object. The main action (`cta`) reads the same in the nav, the hero and the
  close.
- No invented customers, reviews, ratings or figures, and no comparisons with other products. Numbers in the
  UI mocks are sample portfolio data.

## SEO

- `SEO.astro` writes the title, description, canonical, `hreflang` (tr, en, x-default), robots, Open Graph,
  Twitter card, icons, manifest and search console tags for every page.
- Language URLs come from Astro's i18n routing (`getRelativeLocaleUrl`, `getAbsoluteLocaleUrl`); the domain is
  `site` in `astro.config.mjs`, the only place it is set.
- JSON-LD graph: `Organization`, `WebSite`, `WebPage`, `SoftwareApplication` (features, licence, free offer),
  `SoftwareSourceCode` (Go, MIT) and `FAQPage` from the FAQ copy.
- `@astrojs/sitemap` lists `/tr/` and `/en/` with `hreflang` links and `lastmod`; `robots.txt` points to it.
- Performance: fonts self-hosted and preloaded with metric-matched fallbacks, all CSS inlined (no
  render-blocking request), logos served as small webp through `astro:assets`, the hero's WebGL ground skipped
  on phones. Lighthouse (mobile, compressed): performance 95, accessibility 100, best practices 100, SEO 100.

## Checks

```sh
npm run build

# taste-skill (npx skills add Leonxlnx/taste-skill); Chrome or Chromium via CHROME_PATH for the browser checks
S=~/.agents/skills/design-taste-frontend
node $S/scripts/copy-lint.mjs dist/tr/index.html dist/en/index.html --kind software
node $S/scripts/gate.mjs dist/tr/index.html --root dist

# Lighthouse against a compressing server
npx serve dist -l 4401 &
npx lighthouse http://localhost:4401/tr/ --only-categories=performance,seo,accessibility,best-practices
```

Working files go to `.taste-skill/` and `shots/`, both ignored by git.
