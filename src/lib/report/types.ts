/**
 * Instant business report — shared types.
 *
 * Design rule from the spec (§5.4): the model never produces a number.
 * Everything in `Facts` is measured by an API or by our own fetch. The model
 * only ranks, phrases, and maps findings onto the service menu.
 */

export type BizCategory = 'restaurant' | 'studio' | 'shop' | 'service' | 'other';

/** What the visitor optionally taps while the lookup runs. Never required. */
export type VisitorAnswers = {
  /** One of the pain chips, verbatim. Used for ranking hints only. */
  painPoint?: string | null;
  /** Answer to "do you take orders/bookings online?" — null = didn't say. */
  handlesOnline?: boolean | null;
};

export type PlaceCandidate = {
  id: string;
  name: string;
  address: string | null;
  primaryType: string | null;
};

export type PlaceFacts = {
  id: string;
  name: string;
  address: string | null;
  category: BizCategory;
  primaryType: string | null;
  googleTypes: string[];
  website: string | null;
  phone: string | null;
  rating: number | null;
  reviewCount: number | null;
  hoursSet: boolean;
  businessStatus: string | null;
  /** Listing flags. `null` means Google did not report it, which is not the same as false. */
  takeout: boolean | null;
  delivery: boolean | null;
  dineIn: boolean | null;
  reservable: boolean | null;
  curbsidePickup: boolean | null;
  /** Photos on the Google listing. Google returns at most 10, so 10 means "10 or more". */
  googlePhotoCount: number | null;
};

/**
 * Why the site fetch failed (2026-10-04 audit-accuracy pass).
 *
 * Only some failures are a customer's problem too. A 403 or a timeout to an automated checker is not proof that a
 * person with a phone can't open the site, so those are inconclusive (see site-status.ts).
 *   - dns: the address doesn't resolve. Confirmed.
 *   - not_found: the homepage returns 404/410. Confirmed.
 *   - unsafe: the address points at a private network. Confirmed (nobody outside can open it).
 *   - malformed: the listed address isn't a valid URL. Confirmed.
 *   - blocked: 401/403/406/429/451/999, the usual bot walls. Inconclusive.
 *   - timeout, network, server_error, redirects, http_error: inconclusive.
 */
export type SiteFailureKind =
  | 'dns'
  | 'not_found'
  | 'unsafe'
  | 'malformed'
  | 'blocked'
  | 'timeout'
  | 'network'
  | 'server_error'
  | 'redirects'
  | 'http_error';

/** A link or button on the homepage that doesn't lead anywhere. `label` is its visible text. */
export type DeadLink = { label: string; reason: string };

export type SiteFacts = {
  /** false when the listing had no website at all — nothing was attempted. */
  checked: boolean;
  reachable: boolean;
  finalUrl: string | null;
  https: boolean | null;
  status: number | null;
  ttfbMs: number | null;
  totalMs: number | null;
  bytes: number | null;
  /**
   * The homepage's raw HTML had enough text to read. false = the page is built by JavaScript, so anything we'd
   * "not find" in it (a tap-to-call link, an order button) can't be called missing. null = never fetched.
   */
  readable: boolean | null;
  hasViewportMeta: boolean | null;
  /** null when the page isn't readable and no tel: link showed up in the raw HTML. */
  hasTelLink: boolean | null;
  hasLocalBusinessSchema: boolean | null;
  /** Menu published as a PDF or bare image: pinch-and-zoom on a phone, and harder to keep current. */
  menuIsPdfOrImage: boolean | null;
  /**
   * A link or button whose text says order / pickup / takeout / delivery, wherever it points. Lets the score tell
   * "no way to order" (confirmed) from "an order button to a system we don't recognise" (Josh checks by hand).
   */
  hasOrderButton: boolean | null;
  /** Marketplace hosts found in outbound links (DoorDash, UberEats, …). Deduped. */
  marketplaceLinks: string[];
  /** Commission-free / self-hosted ordering platforms found. */
  directOrderingLinks: string[];
  bookingLinks: string[];
  hasEcommerce: boolean | null;
  copyrightYear: number | null;
  /** Year from the server's Last-Modified header, only when the server sent a real one. */
  lastModifiedYear: number | null;
  /**
   * Photos on the homepage: <img> tags and CSS backgrounds, minus logos, icons and tracking pixels.
   * null when the page is built by JavaScript and the HTML shows nothing to count.
   */
  photoCount: number | null;
  /** Stock-photo libraries the homepage pulls images from. */
  stockPhotoHosts: string[];
  /** Order/menu/book-style buttons whose link is empty or "#", and same-site links that return an error. */
  deadLinks: DeadLink[];
  /** <script> tags on the homepage. */
  scriptCount: number | null;
  /** Distinct links on the homepage. */
  linkCount: number | null;
  /** Human-readable reason the fetch failed, when it did. */
  failureReason: string | null;
  failureKind: SiteFailureKind | null;
};

export type Facts = {
  place: PlaceFacts;
  site: SiteFacts;
  answers: VisitorAnswers;
};

/**
 * A finding derived purely from measured facts. `fact` is safe to print
 * verbatim — it contains no inference.
 */
export type DeterministicFinding = {
  code: string;
  /** Higher = more expensive to the owner. Drives ranking. */
  weight: number;
  fact: string;
  /** Short measured metric to display beside the finding, when one exists. */
  metric?: string | null;
};

export type ReportFinding = {
  code: string;
  headline: string;
  consequence: string;
  /** Only ever populated from a measured figure. Null when nothing is honestly derivable. */
  impact: string | null;
};

export type ReportBuild = {
  title: string;
  why: string;
};

export type ReportHeader = {
  /** Needed so the client can ask for a sharpened pass without re-searching. */
  placeId: string | null;
  name: string;
  address: string | null;
  category: BizCategory;
  categoryLabel: string | null;
  rating: number | null;
  reviewCount: number | null;
  website: string | null;
};

export type Report = {
  header: ReportHeader;
  findings: ReportFinding[];
  builds: ReportBuild[];
  /** false when the model call failed and we rendered deterministic prose instead. */
  generated: boolean;
  /** Present only on the no-Places fallback path. */
  fallback?: boolean;
  /** The Growth Score. Only on a looked-up report; the 3-tap path measures nothing. */
  score?: GrowthScore;
};

/**
 * pass = confirmed fine · warn / fail = a confirmed problem · unknown = we tried and couldn't verify (the site turned
 * our checker away, timed out, or is built so we can't read it) · manual = can't be seen from outside, Josh reviews it.
 * unknown and manual are never scored and never count as a problem.
 */
export type ScoreStatus = 'pass' | 'warn' | 'fail' | 'unknown' | 'manual';

export type ScoreArea = {
  key: string;
  label: string;
  status: ScoreStatus;
  /** One measured line, safe to print verbatim. */
  note: string;
};

export type GrowthScore = {
  /** 0–100 over the verified areas, or null when too little could be verified to give an honest number. */
  score: number | null;
  /** Plain-English reason the number was held back. Set exactly when `score` is null. */
  withheldReason: string | null;
  /** Areas with a verified result (pass, warn or fail). */
  verified: number;
  /** Every area on the card, including the ones Josh reviews by hand. */
  total: number;
  areas: ScoreArea[];
  /** Verified areas that aren't a pass. */
  opportunities: number;
};

/** Input for the 3-tap path used when Places can't help us. */
export type TapFallbackInput = {
  businessName?: string | null;
  category: BizCategory;
  hasWebsite: boolean | null;
  whoAnswersPhone: 'me' | 'staff' | 'nobody' | null;
};

/**
 * A single thing we actually found, shown while the lookup runs.
 *
 * These are the *observations* — including the good ones. `deriveFindings`
 * produces the problems. A stream of nothing but bad news reads as a sales
 * pitch; "your rating is great, your website is the problem" is believable.
 *
 * Same truth rule as everything else: every line comes from a measured value.
 */
export type Discovery = {
  text: string;
  tone: 'good' | 'bad' | 'neutral';
};

/** NDJSON frames sent to the client. One JSON object per line. */
export type ReportEvent =
  | { type: 'progress'; step: string }
  | { type: 'discovery'; discovery: Discovery }
  | { type: 'candidates'; candidates: PlaceCandidate[] }
  | { type: 'header'; header: ReportHeader }
  | { type: 'report'; report: Report }
  | { type: 'notice'; message: string };
