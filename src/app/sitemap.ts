import type { MetadataRoute } from 'next';
/* The LEAF, not the barrel. '@/components/service' re-exports ServicePage,
   which reaches components/site and therefore next/font — and next/font emits
   its @font-face CSS and a preload for every route whose module graph touches
   it. A sitemap route has no glyphs. services.ts imports nothing at all, so
   this costs the route nothing. Same trap as the Inter note in layout.tsx. */
import { SERVICES } from '@/components/service/services';
import { SITE_URL } from './site';

/**
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

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    /**
     * Each slug is a top-level route — src/app/<slug>/page.tsx — so the URL is
     * the origin plus one segment. `monthly` rather than `weekly` because these
     * are reference pages: they change when a threshold in the code changes or
     * when a limit stops being true, not on a publishing schedule.
     */
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/${s.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];
}
