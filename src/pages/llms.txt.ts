import type { APIRoute } from 'astro';
import { getDictionary, langUrl, links } from '../i18n/ui';

/** llms.txt (llmstxt.org): a plain summary of Keepfin and its pages for AI assistants and answer engines. */
export const GET: APIRoute = ({ site }) => {
  const en = getDictionary('en');
  const features = en.roadmap.availableItems.map(([name, line]) => `- ${name}: ${line}`).join('\n');
  const inProgress = en.roadmap.inProgressItems.map((name) => `- ${name}`).join('\n');
  const faq = en.faq.items.map(([q, a]) => `### ${q}\n${a}`).join('\n\n');

  const body = `# Keepfin

> ${en.meta.description}

Keepfin is open source (MIT License). The API is written in Go, the web app in Vue, and records are stored in
PostgreSQL. It runs on your own server with Docker Compose.

## Pages

- [Keepfin (English)](${langUrl('en')}): ${en.meta.description}
- [Keepfin (Türkçe)](${langUrl('tr')}): ${getDictionary('tr').meta.description}

## Available today

${features}

## In development

${inProgress}

## Questions

${faq}

## Links

- [Source code on GitHub](${links.github})
- [Quick start](${links.quickStart})
- [Configuration](${links.config})
- [License](${links.license})
- [Sitemap](${new URL('sitemap-index.xml', site).href})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
