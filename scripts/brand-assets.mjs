/**
 * Generates the light brand and icon files the site serves, from the Keepfin SVGs in public/brand
 * (copied from keepfin.io/web/public/brand). Those SVGs carry embedded PNGs and weigh about 110KB each,
 * so the page uses these small rasters instead.
 *
 *   node scripts/brand-assets.mjs
 *
 * Writes:
 *   src/assets/brand/keepfin-wordmark.png  nav logo source, 128px tall (astro:assets <Image> serves webp at 1x/2x)
 *   src/assets/brand/keepfin-mark.png      footer and narrow-nav mark source, 128px tall
 *   public/icons/favicon-32.png          browser tab icon
 *   public/icons/apple-touch-icon.png    180x180 home screen icon
 *   public/icons/icon-192.png            web manifest icon
 *   public/icons/icon-512.png            web manifest icon, also the schema.org logo
 *   public/icons/icon-maskable-512.png   web manifest maskable icon (more padding for the safe zone)
 */
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const BG = '#10171d';
const WORDMARK = 'public/brand/keepfin-dark.svg';
const MARK = 'public/brand/keepfin-mark-dark.svg';

await mkdir('public/icons', { recursive: true });
await mkdir('src/assets/brand', { recursive: true });

const raster = (file, height) => sharp(file, { density: 600 }).resize({ height }).trim();

await raster(WORDMARK, 128).png().toFile('src/assets/brand/keepfin-wordmark.png');
await raster(MARK, 128).png().toFile('src/assets/brand/keepfin-mark.png');

/** The K mark centred on the page's dark ground, the mark taking `share` of the square's height. */
async function squareIcon(size, share, out) {
  const mark = await raster(MARK, Math.round(size * share)).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
}

await squareIcon(32, 0.72, 'public/icons/favicon-32.png');
await squareIcon(180, 0.62, 'public/icons/apple-touch-icon.png');
await squareIcon(192, 0.62, 'public/icons/icon-192.png');
await squareIcon(512, 0.62, 'public/icons/icon-512.png');
await squareIcon(512, 0.5, 'public/icons/icon-maskable-512.png');

console.log('brand assets written');
