'use client';

import { useCallback, useRef, useState } from 'react';
import type { Report } from '@/lib/report/types';

/**
 * The capture point (spec §2.4).
 *
 * It sits *under* the findings, never above them, because the ask only works
 * once the value has already landed: they've read three true things about their
 * own business, and now they're being asked for one thing back.
 *
 * The report is re-posted from here rather than regenerated server-side from
 * the place id on purpose (DECISIONS.md) — the row should record what the
 * visitor actually read when they decided to hand over a number, not what a
 * later regeneration would have produced.
 *
 * Styling is Tailwind utilities off the six `@theme` tokens in globals.css, not
 * the `ir-*` inline-CSS block. That block lives in InstantReport.tsx and this is
 * a separate file; sharing a class namespace across two files means one agent's
 * rewrite silently restyles the other's component.
 */

type Props = {
  report: Report;
  query: string;
  pain: string | null;
};

type Phase = 'idle' | 'sending' | 'done';

export default function PhoneCapture({ report, query, pain }: Props) {
  const [phone, setPhone] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (phase === 'sending') return;

      // Never a dead button — nudge the field instead of blocking the tap.
      // Everything past "is it empty" is the server's rule, so there is exactly
      // one definition of a valid number and it lives at /api/lead.
      if (!phone.trim()) {
        inputRef.current?.focus();
        return;
      }

      setPhase('sending');
      setError(null);

      const { header } = report;

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone,
            businessName: header.name,
            placeId: header.placeId,
            address: header.address,
            category: header.category,
            categoryLabel: header.categoryLabel,
            rating: header.rating,
            reviewCount: header.reviewCount,
            website: header.website,
            findings: report.findings.map((f) => ({
              code: f.code,
              headline: f.headline,
              consequence: f.consequence,
              impact: f.impact,
            })),
            builds: report.builds.map((b) => ({ title: b.title, why: b.why })),
            query,
            pain,
          }),
        });

        const data: unknown = await res.json().catch(() => null);
        const payload = (data ?? {}) as { ok?: boolean; error?: string };

        if (res.ok && payload.ok) {
          setPhase('done');
          return;
        }

        // 400 and 429 both come back with a sentence a person can act on.
        setError(payload.error ?? 'That didn’t go through. Try again in a second.');
        setPhase('idle');
      } catch (err) {
        console.error('[lead] request failed:', err);
        setError('That didn’t go through. Try again in a second.');
        setPhase('idle');
      }
    },
    [pain, phase, phone, query, report]
  );

  if (phase === 'done') {
    return (
      <div className="border-t border-hairline pt-6">
        <p
          role="status"
          className="max-w-[65ch] text-[17px] leading-[1.6] font-semibold text-ink md:text-[18px]"
        >
          Got it. You&apos;ll hear from me by text, not a robot.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-hairline pt-6">
      <p className="max-w-[65ch] text-[17px] leading-[1.6] font-semibold text-ink md:text-[18px]">
        Want me to fix these? Drop your number and I&apos;ll text you a sample site of
        your restaurant this week.
      </p>

      <form onSubmit={submit} className="mt-4 flex max-w-[65ch] flex-wrap gap-2" noValidate>
        <label htmlFor="pc-phone" className="sr-only">
          Your phone number
        </label>
        <input
          id="pc-phone"
          ref={inputRef}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(404) 555-0134"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={phase === 'sending'}
          aria-describedby={error ? 'pc-error' : undefined}
          className="min-w-0 flex-1 basis-56 rounded-lg border border-hairline bg-paper px-4 py-3 text-[17px] text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:text-muted md:text-[18px]"
        />
        <button
          type="submit"
          disabled={phase === 'sending'}
          className="shrink-0 cursor-pointer rounded-lg bg-ink px-5 py-3 text-[17px] font-semibold text-paper hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50 md:text-[18px]"
        >
          {phase === 'sending' ? 'Sending…' : 'Text me the sample'}
        </button>
      </form>

      {error && (
        <p id="pc-error" role="alert" className="mt-2 max-w-[65ch] text-[14px] text-muted">
          {error}
        </p>
      )}
    </div>
  );
}
