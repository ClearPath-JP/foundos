/**
 * The four story chapters on the landing page (2026-10-11). The page reads top to bottom as one conversation:
 * hero → Ch 1–4 → what I review → founder → the form → FAQ. Each chapter is copy, an optional visual, and a
 * 16:9 video slot.
 *
 * Connecting a finished video is an edit to this file only: fill in `media` for that chapter. Until then the slot
 * is a static "not on this page yet" panel: no play button, no timeline, no JavaScript, no video request.
 *
 * Files are self-hosted from `public/vsl/` (served by Vercel's CDN, byte-range requests verified 2026-10-11).
 * Never put them under `/work/`: next.config.ts redirects `/work/:path*` home, so a video there would 307.
 */

/**
 * Josh, 2026-10-11: "we will do the VSL later". Until he approves the videos for public use, a production build shows
 * no chapter video at all, even where `media` is attached (local dev still shows them for review). Flip to true
 * only with his approval, and remove `public/vsl/` from .vercelignore at the same time.
 * Josh, 2026-10-12: "i wanna have vsl" — flipped to true for Ch 1-3 (Ch 4 keeps its hold).
 */
export const VIDEOS_APPROVED_FOR_PUBLIC = true;

export type VslMedia = {
  /** Path under public/, e.g. '/vsl/ch1.mp4'. H.264 + AAC MP4 plays everywhere. */
  src: string;
  /** 16:9 still shown before play, e.g. '/vsl/ch1-poster.jpg'. */
  poster: string;
  /** WebVTT captions, e.g. '/vsl/ch1.en.vtt'. Required: every video must be understandable without sound. */
  captions: string;
  /** The approved transcript, one string per paragraph. The transcript control only renders when this has text. */
  transcript: readonly string[];
};

export type VslChapter = {
  id: string;
  n: number;
  /** The approved chapter name. */
  title: string;
  /** The section's headline. */
  heading: string;
  /** Short supporting copy, one string per paragraph. */
  body: readonly string[];
  media: VslMedia | null;
  /**
   * A publication hold that beats `media`: while set, the slot shows a "not published" panel even when a file is
   * attached. `reason` is for the code reader only. It is never rendered.
   */
  hold?: { reason: string };
};

/* DRAFT — NOT APPROVED FOR PUBLIC USE (2026-10-11): every `heading` and `body` below. Titles are the approved
   chapter names. Ch 4's wording stays off the audit's terms on purpose (see its hold). */
export const VSL_CHAPTERS: readonly VslChapter[] = [
  {
    id: 'belief',
    n: 1,
    title: 'The Belief',
    /* Josh's DRAFT revision, 2026-10-11 (review lines 4–6). Preferred wording, not yet approved for public use. */
    heading: 'The care you give people in person belongs online, too.',
    body: [
      'Think about how you welcome someone in person. Now picture someone finding your business on Instagram or Google before they’ve ever met you.',
      'Can they understand what you offer? Do they know how to take the next step? And if they reach out, do they know what to expect?',
    ],
    /* RC media, copied 2026-10-11 from editing/v2 vsl/exports (byte-identical; md5 checked). Transcript stays empty
       until an approved transcript exists; captions are the RC .vtt (human word-by-word read NOT yet done). */
    media: { src: '/vsl/ch1.mp4', poster: '/vsl/ch1-poster.jpg', captions: '/vsl/ch1.en.vtt', transcript: [] },
  },
  {
    id: 'diagnosis',
    n: 2,
    title: 'The Diagnosis',
    /* Josh's DRAFT revision, 2026-10-11 (review lines 8–9). */
    heading: 'See your business through a new customer’s eyes.',
    body: [
      'Imagine someone discovering your business for the first time. What do they see, what can they understand, and what happens if they decide to reach out? Let’s look at that experience together.',
    ],
    /* RC media, copied 2026-10-11 from editing/v2 vsl/exports (byte-identical; md5 checked). Transcript stays empty
       until an approved transcript exists; captions are the RC .vtt (human word-by-word read NOT yet done). */
    media: { src: '/vsl/ch2.mp4', poster: '/vsl/ch2-poster.jpg', captions: '/vsl/ch2.en.vtt', transcript: [] },
  },
  {
    id: 'solutions',
    n: 3,
    title: 'The Solutions',
    /* Josh's DRAFT revision, 2026-10-11 (review lines 19–20). */
    heading: 'Make the next step easier for your customer.',
    body: ['Let’s look at a few situations where a customer might get stuck, and what could make the experience easier.'],
    /* RC media, copied 2026-10-11 from editing/v2 vsl/exports (byte-identical; md5 checked). Transcript stays empty
       until an approved transcript exists; captions are the RC .vtt (human word-by-word read NOT yet done). */
    media: { src: '/vsl/ch3.mp4', poster: '/vsl/ch3-poster.jpg', captions: '/vsl/ch3.en.vtt', transcript: [] },
  },
  {
    id: 'approach',
    n: 4,
    title: 'The FoundOS Approach',
    /* Josh's DRAFT revision, 2026-10-11 (review lines 30–31). Describes how Josh works, NOT what the free audit
       includes: the audit is a public, outside look only — no private-system access, no implementation, no
       measured client results.
       Proposed bridge to "What I review" — RECORDED ONLY, do not render until the offer review (Josh, 2026-10-11):
       "The free audit is where I start: by looking at what a potential customer can experience publicly. It's not
       a complete diagnosis of everything happening inside your business." */
    heading: 'Understand first. Improve what matters.',
    body: [
      'Before deciding what to change, I want to understand your business and the experience your customers have. Then I can help identify what deserves attention and how to tell whether an improvement helped.',
    ],
    /* RC1 media, copied 2026-10-12 from editing/v2 vsl/exports/rc1/ch4 (FoundOS_CH4_RC1_CLEAN.mp4, md5 checked).
       Josh, 2026-10-12: publish it. The hold (Tally consent checkbox not verified) was lifted by Josh; the form shows a
       plain-text authorization notice, not a checkbox. */
    media: { src: '/vsl/ch4.mp4', poster: '/vsl/ch4-poster.jpg', captions: '/vsl/ch4.en.vtt', transcript: [] },
  },
];

/* DRAFT — NOT APPROVED FOR PUBLIC USE. Questions = Josh's DRAFT revisions, 2026-10-11 (review lines 10–17).
   The seven stage names are the current WORKING framework (Josh, 2026-10-11), not a permanent FoundOS decision
   (source: foundos_strategy_hq/strategy/04_customer_journey.md).
   - The journey is a lens for examining possible customer experiences, not a claim that every customer follows
     this exact sequence.
   - `observable`: whether the question can be looked at from public pages alone. Experience and Follow-up/Return
     need real client or customer information to verify; never present them as diagnosed from outside (the free
     audit reviews only what's publicly visible). Not rendered; it keeps that line explicit for future copy. */
export const JOURNEY_CAPTION = 'Seven stages of the customer journey';
export const JOURNEY_STAGES = [
  { stage: 'Discover', q: 'What do they see when they first find you?', observable: true },
  { stage: 'Understand', q: 'Is it clear what you offer?', observable: true },
  { stage: 'Trust', q: 'Can they find reasons to feel confident choosing you?', observable: true },
  { stage: 'Act', q: 'Is it easy to book, buy or ask?', observable: true },
  { stage: 'Response', q: 'Do they know what happens after reaching out?', observable: true },
  { stage: 'Experience', q: 'Does the experience match what they expected?', observable: false },
  { stage: 'Follow-up / Return', q: 'Is it easy to reconnect when they need you again?', observable: false },
] as const;

/* DRAFT — NOT APPROVED FOR PUBLIC USE. All five examples, the labels and the closing line = Josh's DRAFT revisions,
   2026-10-11 (review lines 22–28). Every example is HYPOTHETICAL: never present one as a diagnosed problem, a
   measured result or a universal recommendation.
   `observable`, as on JOURNEY_STAGES: examples 4–5 (private replies, the post-service experience) can't be assumed
   from public information alone, so they must never be framed as something the outside audit found. Not rendered. */
export const FIX_LABELS = { friction: 'What makes it harder', fix: 'What could help' } as const;
export const FRICTION_FIXES = [
  {
    friction: 'Someone clicks an ad for a specific service but lands on a general homepage.',
    fix: 'A page that clearly explains the service they clicked for.',
    observable: true,
  },
  {
    friction: 'Someone can’t easily tell what’s included in a service.',
    fix: 'Clear package details, with pricing information where appropriate.',
    observable: true,
  },
  {
    friction: 'Someone wants to book or ask a question, but the next step is difficult to find on their phone.',
    fix: 'A clear booking or contact option with only the necessary steps.',
    observable: true,
  },
  {
    friction: 'Someone sends a message after hours and doesn’t know when to expect a reply.',
    fix: 'Clear information about when a real person will respond.',
    observable: false,
  },
  {
    friction: 'Someone finishes a service but isn’t sure how to book again or get in touch.',
    fix: 'An easy way to reconnect or rebook, with follow-up messages sent only when appropriate and permitted.',
    observable: false,
  },
] as const;

/* DRAFT — NOT APPROVED FOR PUBLIC USE (Josh's revision, line 28). */
export const FIXES_CAVEAT =
  'These are possibilities, not prescriptions. The right improvement depends on your business and what your customers actually experience.';

/* DRAFT — NOT APPROVED FOR PUBLIC USE: Josh's DRAFT revisions, 2026-10-11 (review lines 32–35). The four-step
   method is the current WORKING approach (Josh, 2026-10-11), not a permanent FoundOS decision. Same boundary as
   above: these steps describe the work, not the free audit. */
export const METHOD_STEPS = [
  {
    t: 'Diagnose',
    d: 'Start with what a new customer can see and experience publicly. For anything happening behind the scenes, I’d need your input.',
  },
  { t: 'Prioritize', d: 'Identify what matters most to your customers and what makes sense to address first.' },
  {
    t: 'Build',
    d: 'Make a focused improvement based on what the diagnosis reveals, rather than adding tools or features just because they’re available.',
  },
  {
    t: 'Measure',
    d: 'Decide what can be measured, establish a starting point where possible, and look at what happens after the change.',
  },
] as const;
