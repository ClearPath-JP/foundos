import type { Metadata } from 'next';

import type { PageSlug } from './services';

/**
 * The metadata for one service page.
 *
 * ── WHY THIS IS A FUNCTION AND NOT FOUR HAND-WRITTEN OBJECTS ──────────────
 *
 * Because of one documented Next trap that had already bitten this family once,
 * and that produces no error, no warning and no visible symptom on the page:
 *
 *   "Metadata objects exported from multiple segments in the same route are
 *    SHALLOWLY merged … metadata with nested fields such as `openGraph` … that
 *    are defined in an earlier segment are OVERWRITTEN by the last segment to
 *    define them."
 *   — node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
 *
 * src/app/layout.tsx sets a complete `openGraph` block — url, siteName, type,
 * locale — and the file-convention share card in src/app/opengraph-image.tsx is
 * merged into it. A page that declares `openGraph: { title, description }` to
 * fix its share title does not add two fields. It REPLACES all six, and the
 * page silently starts previewing in iMessage and WhatsApp with no image, no
 * site name and no url. That was measured on the built HTML, not guessed:
 * before this file existed, /online-ordering shipped exactly three og tags.
 *
 * So every service page routes through here, and the only things a page passes
 * are the strings that should differ.
 *
 * ⚠️ THE IMAGE FIELDS ARE A HAND-KEPT COPY AND THEY HAVE ONE SOURCE OF TRUTH:
 * src/app/opengraph-image.tsx, which exports `alt` and `size` and generates the
 * PNG at /opengraph-image. They are duplicated here rather than imported
 * because importing a route file into a component drags `next/og` into the
 * page's module graph for two constants. If that file's `alt` or `size` ever
 * changes, change it here in the same commit — a stale alt string is the kind
 * of thing nobody notices for a year.
 *
 * ⚠️ A ROUTE BUILT FOR A REAL BUSINESS MUST NOT USE THIS. These five pages are
 * foundos's own, so foundos's card is the right card. A client demo that
 * inherits it previews a client's link with foundos lead-gen copy on it — see
 * the note in opengraph-image.tsx and what src/app/demo/istanbul/layout.tsx
 * does instead.
 */
const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'foundos — I build and run the online side of restaurants and food businesses in Atlanta.',
} as const;

export type ServiceMetadataInput = {
  slug: PageSlug;
  /** The browser tab and the search result. Ends in the wordmark. */
  title: string;
  /** The search snippet. Aim under about 155 characters. */
  description: string;
  /**
   * The share card title, and it is shorter than `title` on purpose: a link
   * preview has no room for the trailing wordmark, and the site name is already
   * printed under the card by `siteName`.
   */
  shareTitle: string;
  /** The share card body. Shorter than `description` for the same reason. */
  shareDescription: string;
};

export function serviceMetadata({
  slug,
  title,
  description,
  shareTitle,
  shareDescription,
}: ServiceMetadataInput): Metadata {
  return {
    title,
    description,
    /**
     * A relative canonical composes against `metadataBase` in the root layout,
     * so this resolves to https://foundos.ai/<slug>. The layout already derives
     * the same value from its URL-instance trick, and it is written out anyway
     * because a service page is exactly the kind of route somebody copies to
     * make a fifth one, and an inherited canonical is invisible to whoever
     * copies it.
     */
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      /**
       * A leading-dot path is the one form Next composes against the CURRENT
       * pathname rather than against metadataBase, so this resolves to the page
       * being shared. og:url is how Facebook, WhatsApp and iMessage IDENTIFY a
       * page: two links carrying the same og:url are one object to them and
       * pool their previews. The bare origin here would make all five of these
       * pages the homepage. Same reasoning, and the same shape, as layout.tsx.
       */
      url: './',
      siteName: 'foundos',
      type: 'website',
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    /**
     * Only `card` is set. Next's metadata post-pass fills twitter title,
     * description and images from `openGraph` whenever the twitter block does
     * not declare its own, so repeating them here would be three more strings
     * to drift. Without this line the image is still attached but rendered as a
     * small square thumbnail instead of the 1200x630 card.
     */
    twitter: { card: 'summary_large_image' },
  };
}
