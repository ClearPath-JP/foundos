import type { MetadataRoute } from 'next';
/* Leaf config modules only: nothing that reaches next/font, which would emit
   @font-face CSS and a preload for this glyph-less route. Same trap as the Inter
   note in layout.tsx. */
import { PLANS } from '@/config/offer';
import { SITE_URL } from './site';
import { PROJECT_DETAILS } from './projects/details';

/**
 * ── 2026-10-01: THE RESTAURANT OFFER REPLACED THE LIST ───────────────────
 *
 * The site now sells two monthly plans and a short project catalog
 * (config/offer.ts). The URLs below are that offer's pages. The 2026-09-11 shop
 * (/pricing, /systems), /why, /questions and the five service pages were taken
 * OUT: they still show the old $400 + $97 price list, and a sitemap is an active
 * request to index two different prices for the same work.
 * Decided the same evening: those nine pages were deleted and each old URL now
 * 301s to its nearest current page (next.config.ts, DECISIONS.md). offer.ts
 * imports nothing, so this route still pays nothing for fonts.
 *
 * The history below is kept because the reasoning about demos still holds.
 *
 * /sitemap.xml — a 404 until now.
 *
 * SIX URLS, AND THE LIST IS SHORT ON PURPOSE. The site has more routes than
 * this. Every omission is a decision, written down here so nobody "completes"
 * the list later without knowing what they would be publishing:
 *
 * ── 2026-09-05: the four service pages were added ─────────────────────────
 *
 * They come from SERVICES in components/service/services.ts rather than being
 * retyped, so a slug can never disagree with the route that serves it. ⚠️ THAT
 * LIST IS ALSO WHERE THE RULE AGAINST GROWING IT LIVES: a page joins it when
 * there are 400+ words true of that service and of nothing else on the site,
 * and never as a city variant. Thirty pages that differ by a town name are a
 * doorway set, and a sitemap is an active request to index every one of them —
 * which is how that particular penalty gets asked for in writing.
 *
 * ── 2026-09-08: /food-truck-location joined them, making it five ──────────
 *
 * Nothing in this file changed to admit it, which is the property the SERVICES
 * import was bought for. It was checked against the rule rather than waved
 * through: the SMS arithmetic, the staleness rule and the 10DLC lead time are
 * true of that page and of no other route here.
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
 * the page being sold; the five service pages are the next thing anybody
 * should land on; privacy exists to exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly') => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page('', 1, 'weekly'),
    page('/plans', 0.9, 'weekly'),
    page('/restaurant-systems', 0.8, 'monthly'),
    ...PLANS.map((p) => page(`/plans/${p.slug}`, 0.9, 'weekly')),
    ...Object.keys(PROJECT_DETAILS).map((slug) => page(`/projects/${slug}`, 0.8, 'monthly')),
    page('/work', 0.7, 'monthly'),
    page('/audit', 0.8, 'monthly'),
    page('/contact', 0.6, 'yearly'),
    page('/privacy', 0.1, 'yearly'),
  ];
}
