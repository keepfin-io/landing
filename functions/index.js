/**
 * Cloudflare Pages Function for `/` only: sends the visitor to /tr/ or /en/ before any HTML loads.
 * The language chosen in the site's language menu (the `lang` cookie) wins; else the first Turkish or English
 * entry in Accept-Language, by its q weight; else English. dist/index.html does the same in the browser on hosts
 * without this function.
 */
const LANGS = ['tr', 'en'];
const FALLBACK = 'en';

function fromCookie(header) {
  const match = /(?:^|;\s*)lang=([a-z]+)/.exec(header || '');
  return match && LANGS.includes(match[1]) ? match[1] : null;
}

function fromAcceptLanguage(header) {
  const wanted = (header || '')
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { lang: tag.split('-')[0], q: q ? Number(q.slice(2)) || 0 : 1, index };
    })
    .filter((entry) => entry.lang && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  const hit = wanted.find((entry) => LANGS.includes(entry.lang));
  return hit ? hit.lang : null;
}

export function onRequestGet({ request }) {
  const lang =
    fromCookie(request.headers.get('Cookie')) ?? fromAcceptLanguage(request.headers.get('Accept-Language')) ?? FALLBACK;
  const url = new URL(request.url);
  const target = new URL(`/${lang}/${url.search}`, url);
  return new Response(null, {
    status: 302,
    headers: {
      Location: target.href,
      Vary: 'Accept-Language, Cookie',
      'Cache-Control': 'private, no-store',
    },
  });
}
