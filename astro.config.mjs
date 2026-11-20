// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';

const buildDate = new Date().toISOString();

// https://astro.build/config
export default defineConfig({
  site: 'https://keepfin.io',

  // One URL per page: every page ends in a slash and is built as <path>/index.html.
  trailingSlash: 'always',
  // CSS is inlined into each page: no render-blocking stylesheet request before the first paint.
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,

  // Language links prefetch on hover (they carry data-astro-prefetch).
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },

  // Both languages live under their own prefix (/tr/, /en/); `/` picks one (src/pages/index.astro and the
  // Cloudflare Pages Function in functions/index.js). English is the fallback for every other browser language.
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },

  // Self-hosted fonts: downloaded at build, served from the site, preloaded, with metric-matched fallbacks.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Chivo',
      cssVariable: '--font-chivo',
      weights: ['400 700'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Chivo Mono',
      cssVariable: '--font-chivo-mono',
      weights: ['400', '500'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  // Search console ownership tags: printed only when set (e.g. in the Cloudflare Pages build settings).
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_BING_SITE_VERIFICATION: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { tr: 'tr-TR', en: 'en-US' },
      },
      // `/` only sends visitors on to /tr/ or /en/
      filter: (page) => /\/(tr|en)\/$/.test(page),
      serialize: (item) => ({ ...item, lastmod: buildDate }),
    }),
  ],
});
