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
};

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
  hasViewportMeta: boolean | null;
  hasTelLink: boolean | null;
  hasLocalBusinessSchema: boolean | null;
  /** Menu published as a PDF or bare image — Google and phones both struggle with it. */
  menuIsPdfOrImage: boolean | null;
  /** Marketplace hosts found in outbound links (DoorDash, UberEats, …). Deduped. */
  marketplaceLinks: string[];
  /** Commission-free / self-hosted ordering platforms found. */
  directOrderingLinks: string[];
  bookingLinks: string[];
  hasEcommerce: boolean | null;
  copyrightYear: number | null;
  /** Human-readable reason the fetch failed, when it did. */
  failureReason: string | null;
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

export type ScoreStatus = 'pass' | 'warn' | 'fail' | 'unknown';

export type ScoreArea = {
  key: string;
  label: string;
  status: ScoreStatus;
  /** One measured line, safe to print verbatim. */
  note: string;
};

export type GrowthScore = {
  /** 0–100, over the areas that could be measured. */
  score: number;
  areas: ScoreArea[];
  /** Measured areas that aren't a pass. */
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
