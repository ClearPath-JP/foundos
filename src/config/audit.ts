/**
 * The free 3-point audit funnel (launch pack, 2026-10-09). One page, one form.
 * Reel → comment AUDIT → DM → foundos.ai → Tally form → Josh emails the audit.
 *
 * Leaf module: imports nothing, so any route can read it without pulling in fonts.
 */

/** The published Tally form. Set from the Tally dashboard; the page renders a fallback until it is filled in. */
export const TALLY_FORM_ID = 'zxpy6q';

/** Hosted form (the fallback link) and the embed URL. */
export const TALLY_FORM_URL = TALLY_FORM_ID ? `https://tally.so/r/${TALLY_FORM_ID}` : '';
export const TALLY_EMBED_URL = TALLY_FORM_ID
  ? `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
  : '';

/**
 * The only query parameters ever forwarded into the form. Anything else on the page URL (names, emails, IG ids,
 * fbclid…) is dropped. A source value is an attribution hint, not proof of who someone is.
 * consent_version is NOT here: the page always sets it to CONSENT_VERSION itself, so a link can't change it.
 */
export const FORWARDED_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'entry_point',
  'campaign_id',
  'is_test',
] as const;

/** Bump when the authorization notice wording changes, in the Tally form AND here. */
/* v3 (2026-10-12): Instagram made optional, a required "Contact consent" checkbox added, notice reworded. */
export const CONSENT_VERSION = 'audit-request-v3';

export const INSTAGRAM = { handle: 'josh.systems', url: 'https://www.instagram.com/josh.systems/' } as const;

/** Where audit requests and privacy questions go. */
export const AUDIT_EMAIL = 'josh@foundos.ai';
