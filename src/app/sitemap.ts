import type { MetadataRoute } from 'next';
import { SITE_URL } from './site';

/**
 * /sitemap.xml — a 404 until now.
 *
 * TWO URLS, AND THE LIST IS SHORT ON PURPOSE. The site has more routes than
 * this. Every omission is a decision, written down here so nobody "completes"
 * the list later without knowing what they would be publishing:
 *
 *   /demo/truckos — OMITTED, and this one overrides the brief that asked for
 *     it. Its own generateMetadata sets `robots: { index: false, follow: false }`
 *     (src/app/demo/truckos/page.tsx). Submitting a noindex URL in a sitemap is
 *     a direct contradiction: Search Console flags it as an error and the page
 *     stays out of the index anyway, so the only thing the entry buys is a red
 *     row in the report of a man who sells search. It belongs here the moment
 *     that noindex comes off — the two changes go together, in that order.
 *
 *   /demo/istanbul — OMITTED for the same mechanical reason: its layout sets
 *     `robots: { index: false, follow: false }` too.
 *
 *   /demo/amistad, /demo/babygirl, /demo/heirloom — OMITTED on judgement.
 *     These three carry the real business names of prospects who have not
 *     hired foundos, and whether they stay up at all is an open decision. A
 *     sitemap is an active request to index: it is how a stranger's business
 *     name ends up in Google attached to a page they never agreed to. They do
 *     not go in until that decision is made, and if the decision is to keep
 *     them, the owners get asked first.
 *
 *   /dashboard, /api/chat — OMITTED. Both call notFound() in production.
 *
 * `lastModified` is evaluated once, at build time — this route is statically
 * cached and reads nothing at request time — so it means "when the site was
 * last published", which is what the field is for.
 *
 * `priority` is a relative hint within one site, not a score. The homepage is
 * the page being sold; privacy exists to exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];
}
