/**
 * The one column. Rules are allowed outside it; nothing else is.
 *
 * ⚠️ 1080, not 1200, and the 120px came off for a measured reason. At 1440 a
 * 1200 shell gave a 1140px content box holding a 720px measure, so 37% of every
 * band was empty and the eyebrow hairline ran 420px past the last word it had
 * anything to do with — a rule pointing at nothing, in an audit's words, and
 * worse at 1920. 1080 puts the measure at 72% of the column instead of 63%.
 * The other half of that fix is in `.eb-lh`, which stops at the text column
 * rather than at the screen edge above 1024px. The full-bleed section dividers
 * stay full bleed: those separate bands, and a divider that stops mid-page
 * reads as a broken rule rather than a considered one.
 *
 * This is Tailwind rather than a class in SITE_CSS on purpose — it is layout
 * arithmetic, not brand, and it is the one thing on these pages that a reader
 * can check against the utility names without opening a stylesheet. It is a
 * plain string so it composes: `${SHELL} eb-sec`.
 */
export const SHELL = 'mx-auto w-full max-w-[1080px] px-5 sm:px-10';
