import { streamText, Output, jsonSchema } from 'ai';
import { categoryLabel } from './category';
import { toBuilds, toFallbackFindings } from './findings';
import type {
  DeterministicFinding,
  Facts,
  Report,
  ReportBuild,
  ReportFinding,
  ReportHeader,
} from './types';
import { siteConfirmedDown, siteInspected } from './site-status.ts';

/**
 * Turns measured facts into owner-language findings.
 *
 * The model's only job is ranking, phrasing, and mapping to services. It is
 * given the facts and told to use nothing else. Two hard guards enforce that
 * regardless of what comes back:
 *
 *   1. Any finding whose `code` isn't one we derived is dropped outright.
 *   2. Any number in the prose that doesn't appear in our own facts is stripped.
 *
 * If the call fails at any point we render the deterministic findings instead,
 * so the page always has a report (spec §6.1).
 */

export const REPORT_MODEL = 'anthropic/claude-sonnet-5';

/**
 * The model pass is OFF unless someone turns it on. Set REPORT_MODEL_ENABLED=1
 * to re-enable it.
 *
 * Two reasons, and the second is the important one.
 *
 * First: it isn't working anyway. The Vercel AI Gateway rejects this model with
 * "Free tier users do not have access to this model" (403,
 * no_providers_available), so every call already throws and every visitor
 * already gets the deterministic report. Turning it off changes nothing a
 * visitor sees — it just stops us making a request we know will fail.
 *
 * Second: leaving it on is a trap. It costs nothing *because* the account has no
 * credits. The day credits are added for any unrelated reason, this silently
 * starts billing per report, with no deploy and nothing to notice it. Josh has
 * no capital; a cost that switches itself on is exactly the wrong shape of risk.
 *
 * The deterministic report is not a fallback in the apologetic sense — it is
 * specific, sourced from measured facts, and it is what the site has been
 * shipping. The model only ever re-phrased it. When there's revenue to pay for
 * polish, set the flag.
 */
const MODEL_ENABLED = process.env.REPORT_MODEL_ENABLED === '1';

type ModelShape = {
  findings: Array<{
    code: string;
    headline: string;
    consequence: string;
    impact?: string | null;
  }>;
  builds: Array<{ title: string; why: string }>;
};

const outputSchema = jsonSchema<ModelShape>({
  type: 'object',
  additionalProperties: false,
  required: ['findings', 'builds'],
  properties: {
    findings: {
      type: 'array',
      minItems: 1,
      maxItems: 5,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['code', 'headline', 'consequence'],
        properties: {
          code: {
            type: 'string',
            description: 'Must be one of the codes given in the facts. Never invent one.',
          },
          headline: {
            type: 'string',
            description:
              'The finding in the owner\'s own language, one sentence, second person. No jargon.',
          },
          consequence: {
            type: 'string',
            description:
              'One short sentence on what it costs them in customers or money. No invented figures.',
          },
          impact: {
            type: ['string', 'null'],
            description:
              'Copy the provided metric verbatim if one exists for this code, otherwise null.',
          },
        },
      },
    },
    builds: {
      type: 'array',
      minItems: 1,
      maxItems: 3,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'why'],
        properties: {
          title: { type: 'string', description: 'What Josh would build. Plain and concrete.' },
          why: { type: 'string', description: 'One sentence on why it fixes the finding above.' },
        },
      },
    },
  },
});

const SYSTEM = `You write the "instant business report" on foundos.ai for Josh, who builds and runs websites, online ordering, booking, and AI phone answering for restaurants and food businesses in Atlanta.

The person reading this owns the business you are describing. They know their own review count, their own hours, and their own menu better than you ever will. One invented detail destroys their trust in Josh permanently.

Absolute rules:
- Use ONLY the facts provided. You have no other knowledge about this business.
- NEVER produce a number, price, percentage, or count that is not in the facts.
- Return only the finding codes you were given. Never invent a code.
- If a fact has a metric, copy it verbatim into impact. If it has none, use null.
- Rank most expensive to the owner first.
- Never claim Google can't read a PDF, that a dated footer means the business is closed, or that a fix will bring a specific result. Describe what was measured and the plain consequence.

Voice: plain, direct, owner-to-owner. Like a contractor pointing at a problem, not a consultant presenting. Second person ("your site", "you"). No jargon — never say SEO, schema, conversion, funnel, or optimize. Short sentences. No hype, no exclamation marks, no emoji.

Write the consequence in terms of customers and money, not technology.`;

function factsPrompt(facts: Facts, findings: DeterministicFinding[]): string {
  const { place, site, answers } = facts;

  const lines: string[] = [
    `Business: ${place.name}`,
    place.address ? `Address: ${place.address}` : null,
    place.primaryType ? `Google category: ${place.primaryType}` : null,
    `Check set: ${place.category}`,
    place.rating !== null ? `Google rating: ${place.rating}` : 'Google rating: not reported',
    place.reviewCount !== null
      ? `Google review count: ${place.reviewCount}`
      : 'Google review count: not reported',
    `Website on listing: ${place.website ?? 'none'}`,
    !site.checked
      ? null
      : siteInspected(site)
        ? 'Site check: opened normally'
        : siteConfirmedDown(site)
          ? `Site check: does not open for anyone (${site.failureReason ?? 'failed'})`
          : 'Site check: INCONCLUSIVE. Our automated checker was turned away or timed out. Customers may open it fine. Do not say or imply the site is down, broken or unreachable.',
    site.marketplaceLinks.length
      ? `Delivery apps linked from their site: ${site.marketplaceLinks.join(', ')}`
      : null,
    site.directOrderingLinks.length
      ? `Their own ordering platform: ${site.directOrderingLinks.join(', ')}`
      : null,
    site.bookingLinks.length
      ? `Booking tools found: ${site.bookingLinks.join(', ')}`
      : null,
    answers.painPoint ? `What the owner said hurts most: ${answers.painPoint}` : null,
    answers.handlesOnline !== null && answers.handlesOnline !== undefined
      ? `Owner says they take orders/bookings online: ${answers.handlesOnline ? 'yes' : 'no'}`
      : null,
  ].filter((l): l is string => Boolean(l));

  const findingLines = findings
    .map(
      (f, i) =>
        `${i + 1}. code=${f.code} | metric=${f.metric ?? 'none'} | measured: ${f.fact}`
    )
    .join('\n');

  return `FACTS
${lines.join('\n')}

MEASURED FINDINGS (these are the only findings that exist; keep 3 to 5, most expensive first)
${findingLines}

Write the report. Rephrase each finding you keep in the owner's language, add its consequence, and then give up to 3 things Josh would build, mapped to the findings you kept.`;
}

/** Collect every number that legitimately appears in our own facts. */
function allowedNumbers(facts: Facts, findings: DeterministicFinding[]): Set<string> {
  const haystack = [
    ...findings.map((f) => `${f.fact} ${f.metric ?? ''}`),
    facts.place.rating !== null ? String(facts.place.rating) : '',
    facts.place.reviewCount !== null ? String(facts.place.reviewCount) : '',
    facts.site.totalMs !== null ? (facts.site.totalMs / 1000).toFixed(1) : '',
    facts.site.status !== null ? String(facts.site.status) : '',
    facts.site.copyrightYear !== null ? String(facts.site.copyrightYear) : '',
    String(facts.site.marketplaceLinks.length),
  ].join(' ');

  return new Set(haystack.match(/\d+(?:\.\d+)?/g) ?? []);
}

/**
 * Strip any sentence containing a number we can't account for. Losing a
 * sentence is cheap; printing an invented figure is not.
 */
function scrubNumbers(text: string, allowed: Set<string>): string {
  const numbers = text.match(/\d+(?:\.\d+)?/g);
  if (!numbers) return text;

  const hasUnknown = numbers.some((n) => !allowed.has(n));
  if (!hasUnknown) return text;

  const kept = text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => {
      const found = sentence.match(/\d+(?:\.\d+)?/g);
      return !found || found.every((n) => allowed.has(n));
    })
    .join(' ')
    .trim();

  return kept;
}

export function buildHeader(facts: Facts): ReportHeader {
  return {
    placeId: facts.place.id,
    name: facts.place.name,
    address: facts.place.address,
    category: facts.place.category,
    categoryLabel: categoryLabel(facts.place.primaryType),
    rating: facts.place.rating,
    reviewCount: facts.place.reviewCount,
    website: facts.place.website,
  };
}

export function deterministicReport(
  facts: Facts,
  findings: DeterministicFinding[]
): Report {
  return {
    header: buildHeader(facts),
    findings: toFallbackFindings(findings),
    builds: toBuilds(findings),
    generated: false,
  };
}

/**
 * Streams progressively more complete reports. Always yields at least one —
 * the deterministic version — before attempting the model call, so a caller
 * that gives up early still has something real to render.
 */
export async function* generateReport(
  facts: Facts,
  findings: DeterministicFinding[]
): AsyncGenerator<Report> {
  const fallback = deterministicReport(facts, findings);

  if (findings.length === 0) {
    yield fallback;
    return;
  }

  // The billable pass is opt-in. Off by default — see MODEL_ENABLED above.
  // Returning here means no request is made at all, so there is nothing to be
  // charged for and nothing to fail. The visitor still gets a full report.
  if (!MODEL_ENABLED) {
    yield fallback;
    return;
  }

  const validCodes = new Map(findings.map((f) => [f.code, f]));
  const allowed = allowedNumbers(facts, findings);
  const header = buildHeader(facts);

  const finalize = (partial: Partial<ModelShape>): Report | null => {
    const rawFindings = partial.findings ?? [];

    const clean: ReportFinding[] = [];
    for (const f of rawFindings) {
      if (!f?.code || !f.headline || !f.consequence) continue;
      const source = validCodes.get(f.code);
      if (!source) continue; // guard 1: no invented codes
      if (clean.some((c) => c.code === f.code)) continue;

      const headline = scrubNumbers(f.headline, allowed); // guard 2: no invented numbers
      const consequence = scrubNumbers(f.consequence, allowed);
      if (!headline) continue;

      const impact =
        f.impact && source.metric && f.impact.trim() === source.metric.trim()
          ? source.metric
          : (source.metric ?? null);

      clean.push({ code: f.code, headline, consequence, impact });
    }

    if (clean.length === 0) return null;

    const rawBuilds = (partial.builds ?? []).filter(
      (b): b is ReportBuild => Boolean(b?.title && b?.why)
    );
    const builds = rawBuilds.length
      ? rawBuilds.slice(0, 3).map((b) => ({
          title: scrubNumbers(b.title, allowed) || b.title,
          why: scrubNumbers(b.why, allowed),
        }))
      : toBuilds(findings);

    return { header, findings: clean.slice(0, 5), builds, generated: true };
  };

  try {
    const result = streamText({
      model: REPORT_MODEL,
      system: SYSTEM,
      prompt: factsPrompt(facts, findings),
      temperature: 0,
      output: Output.object({ schema: outputSchema }),
      onError({ error }) {
        console.error('[report] model stream error:', error);
      },
    });

    let emitted = false;
    let last = '';

    for await (const partial of result.partialOutputStream) {
      const report = finalize((partial ?? {}) as Partial<ModelShape>);
      if (!report) continue;

      // Only push when something actually changed — avoids thrashing the client.
      const signature = JSON.stringify(report.findings) + JSON.stringify(report.builds);
      if (signature === last) continue;
      last = signature;
      emitted = true;
      yield report;
    }

    if (!emitted) yield fallback;
  } catch (err) {
    console.error('[report] generation failed, serving deterministic report:', err);
    yield fallback;
  }
}
