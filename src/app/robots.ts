import type { MetadataRoute } from 'next';
import { SITE_URL } from './site';

/**
 * /robots.txt — it was a 404 until now, which is a bad look on a site that
 * sells local search as a service.
 *
 * Next builds this file into a real /robots.txt at the origin root; there is
 * no file in public/ to keep in sync, and none should be added — a static
 * public/robots.txt would win over this route and the two would drift.
 *
 * Everything public is crawlable, so there is one rule and one sitemap line.
 *
 * ⚠️ Deliberately NO `Disallow` entries:
 *   - /dashboard and /api/chat already call notFound() when VERCEL is set, so
 *     in production they are 404s. There is nothing there to keep a crawler
 *     out of, and naming them in a world-readable file would advertise two
 *     paths that do not resolve.
 *   - robots.txt is a crawl hint, never an access control. If something ever
 *     genuinely must not be reached, it gets a real 404 or auth — the same way
 *     /dashboard already does — not a line in here.
 *
 * The `host` directive is also left out on purpose: only Yandex ever honoured
 * it, and the canonical tag in layout.tsx states the preferred origin properly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
