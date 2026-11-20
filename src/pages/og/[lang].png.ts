import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { getDictionary, languages, type Lang } from '../../i18n/ui';

/**
 * The social card for each language (1200 x 630, rendered at build): Keepfin's wordmark (it reads keepfin.io), the
 * page's headline and line, on the page's dark ground with the brand's teal light. og:image and twitter:image use it.
 */
export const getStaticPaths: GetStaticPaths = () =>
  (Object.keys(languages) as Lang[]).map((lang) => ({ params: { lang } }));

const root = process.cwd();
const font = (file: string) => readFile(join(root, 'node_modules/@fontsource/chivo/files', file));

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Lang;
  const t = getDictionary(lang);

  const [logo, regular, regularExt, medium, mediumExt] = await Promise.all([
    readFile(join(root, 'src/assets/brand/keepfin-wordmark.png')),
    font('chivo-latin-400-normal.woff'),
    font('chivo-latin-ext-400-normal.woff'),
    font('chivo-latin-500-normal.woff'),
    font('chivo-latin-ext-500-normal.woff'),
  ]);

  const node = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}) => ({
    type,
    props: { style, children, ...extra },
  });

  const card = node(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '72px 80px',
      position: 'relative',
      backgroundColor: '#10171d',
      backgroundImage:
        'radial-gradient(circle at 88% 12%, rgba(57, 173, 176, 0.55), rgba(16, 23, 29, 0) 52%), radial-gradient(circle at 8% 100%, rgba(39, 159, 163, 0.28), rgba(16, 23, 29, 0) 45%)',
      color: '#e0eaed',
      fontFamily: 'Chivo, Chivo Ext',
    },
    [
      node('img', { height: 64 }, undefined, { src: `data:image/png;base64,${logo.toString('base64')}`, height: 64 }),
      node('div', { position: 'absolute', left: 80, right: 80, top: 236, display: 'flex', flexDirection: 'column', gap: 24 }, [
        node('div', { fontSize: 72, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 960 }, t.meta.ogTitle),
        node('div', { fontSize: 32, lineHeight: 1.35, color: '#9aabb2', maxWidth: 940 }, t.meta.ogSubtitle),
      ]),
    ],
  );

  const svg = await satori(card as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Chivo', data: regular, weight: 400, style: 'normal' },
      { name: 'Chivo', data: medium, weight: 500, style: 'normal' },
      // Turkish letters (ş, ğ, ı, İ) live in the latin-ext subset: a second family the first falls back to
      { name: 'Chivo Ext', data: regularExt, weight: 400, style: 'normal' },
      { name: 'Chivo Ext', data: mediumExt, weight: 500, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=604800' },
  });
};
