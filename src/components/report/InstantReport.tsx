'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import PhoneCapture from '@/components/report/PhoneCapture';
import { CAL, DEMO_LINE, DEMO_LINE_PRETTY, DEMOS, PHONE } from '@/lib/contact';
import type {
  BizCategory,
  Discovery,
  PlaceCandidate,
  Report,
  ReportEvent,
  VisitorAnswers,
} from '@/lib/report/types';

/**
 * The instant business report — the whole job of the homepage (spec §5).
 *
 * Name-first: one input, no gate. The optional pain chips appear *during* the
 * lookup so they never stand between the visitor and the value. If they tap one
 * while waiting, we quietly re-run the phrasing pass afterwards and swap the
 * sharpened report in; the header never moves.
 */

const PAIN_CHIPS = [
  'Missed calls',
  'No website',
  'App fees',
  'No bookings',
] as const;

const TAP_CATEGORIES: Array<{ value: BizCategory; label: string }> = [
  { value: 'restaurant', label: 'Food' },
  { value: 'studio', label: 'Studio / salon' },
  { value: 'shop', label: 'Shop' },
  { value: 'service', label: 'Service' },
  { value: 'other', label: 'Something else' },
];

type Phase = 'idle' | 'running' | 'candidates' | 'report' | 'tap';

async function* readNdjson(body: ReadableStream<Uint8Array>): AsyncGenerator<ReportEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  // The consumer returns early on `candidates` and `notice`. Without the
  // finally the response body is never cancelled and the connection leaks.
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          yield JSON.parse(line) as ReportEvent;
        } catch {
          /* partial or malformed line — skip it */
        }
      }
    }

    if (buffer.trim()) {
      try {
        yield JSON.parse(buffer) as ReportEvent;
      } catch {
        /* ignore trailing garbage */
      }
    }
  } finally {
    await reader.cancel().catch(() => {
      /* already closed */
    });
  }
}

export default function InstantReport() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [query, setQuery] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  /**
   * Discoveries arrive in bursts — every site check resolves off one fetch, so
   * the server emits six at once. `pending` holds them and `found` releases
   * them one at a time, which is what makes the wait read as finding things
   * rather than as a data dump.
   */
  const [pending, setPending] = useState<Discovery[]>([]);
  const [found, setFound] = useState<Discovery[]>([]);
  const [candidates, setCandidates] = useState<PlaceCandidate[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pain, setPain] = useState<string | null>(null);
  const [refining, setRefining] = useState(false);

  // Tap-fallback state
  const [tapCategory, setTapCategory] = useState<BizCategory | null>(null);
  const [tapHasWebsite, setTapHasWebsite] = useState<boolean | null>(null);
  const [tapPhone, setTapPhone] = useState<'me' | 'staff' | 'nobody' | null>(null);

  const painRef = useRef<string | null>(null);
  /** `${placeId}|${pain}` we've already sharpened for — stops a refine loop. */
  const refinedForRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  /** Scroll to the report once, on first render — not on every refine. */
  const scrolledRef = useRef(false);

  const run = useCallback(
    async (payload: Record<string, unknown>, opts?: { refine?: boolean }) => {
      if (opts?.refine) setRefining(true);
      else {
        setPhase('running');
        setSteps([]);
        setPending([]);
        setFound([]);
        setReport(null);
        setNotice(null);
        setCandidates([]);
      }

      try {
        const res = await fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.body) throw new Error('no stream');

        let got = false;
        for await (const event of readNdjson(res.body)) {
          if (event.type === 'progress') {
            setSteps((prev) => (prev.includes(event.step) ? prev : [...prev, event.step]));
          } else if (event.type === 'discovery') {
            const { discovery } = event;
            setPending((prev) => [...prev, discovery]);
          } else if (event.type === 'candidates') {
            setCandidates(event.candidates);
            setPhase('candidates');
            return;
          } else if (event.type === 'header') {
            setReport((prev) =>
              prev
                ? { ...prev, header: event.header }
                : { header: event.header, findings: [], builds: [], generated: false }
            );
          } else if (event.type === 'report') {
            got = true;
            setReport(event.report);
            setPhase('report');
          } else if (event.type === 'notice') {
            if (event.message === 'needs_tap_fallback') {
              setPhase('tap');
              return;
            }
            setNotice(event.message);
            setPhase('idle');
            return;
          }
        }

        if (!got && !opts?.refine) setPhase('tap');
      } catch (err) {
        console.error('[report] request failed:', err);
        if (!opts?.refine) setPhase('tap');
      } finally {
        if (opts?.refine) setRefining(false);
      }
    },
    []
  );

  /**
   * Release one discovery at a time. The first lands fast so the panel doesn't
   * sit empty; the rest are paced so a burst of six site checks reads as six
   * separate findings.
   */
  useEffect(() => {
    if (pending.length === 0) return;
    const delay = found.length === 0 ? 140 : 340;
    const timer = setTimeout(() => {
      setFound((prev) => [...prev, pending[0]]);
      setPending((prev) => prev.slice(1));
    }, delay);
    return () => clearTimeout(timer);
  }, [pending, found.length]);

  /**
   * Once a report exists it *is* the page (spec §4.2) — bring it to the top of
   * the viewport so the hero copy isn't holding the visitor's attention.
   */
  useEffect(() => {
    if (phase !== 'report' || scrolledRef.current || !reportRef.current) return;
    scrolledRef.current = true;
    reportRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [phase]);

  /**
   * If they told us what hurts — whether during the wait or after the report
   * landed — re-run just the phrasing pass. The facts are cached server-side,
   * so this costs no extra Places lookup.
   */
  useEffect(() => {
    const placeId = report?.header.placeId;
    if (phase !== 'report' || !pain || !placeId) return;

    const key = `${placeId}|${pain}`;
    if (refinedForRef.current === key) return;
    refinedForRef.current = key;

    const answers: VisitorAnswers = { painPoint: pain, handlesOnline: null };
    void run({ mode: 'place', placeId, answers }, { refine: true });
  }, [pain, phase, report?.header.placeId, run]);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      // Never render a dead button — nudge the field instead of blocking the tap.
      if (q.length < 2) {
        inputRef.current?.focus();
        return;
      }
      painRef.current = null;
      setPain(null);
      await run({ mode: 'search', query: q });
    },
    [query, run]
  );

  const pickCandidate = useCallback(
    async (candidate: PlaceCandidate) => {
      await run({
        mode: 'place',
        placeId: candidate.id,
        answers: { painPoint: painRef.current, handlesOnline: null },
      });
    },
    [run]
  );

  const submitTap = useCallback(async () => {
    if (!tapCategory) return;
    await run({
      mode: 'tap',
      tap: {
        businessName: query.trim() || null,
        category: tapCategory,
        hasWebsite: tapHasWebsite,
        whoAnswersPhone: tapPhone,
      },
    });
  }, [query, run, tapCategory, tapHasWebsite, tapPhone]);

  // Selection only. The effect above decides when a sharpening pass is due.
  const choosePain = useCallback((chip: string) => {
    const next = painRef.current === chip ? null : chip;
    painRef.current = next;
    setPain(next);
  }, []);

  return (
    <div className="ir">
      <style>{CSS}</style>

      {/* ---- Input -------------------------------------------------------- */}
      {(phase === 'idle' || phase === 'running') && (
        <form className="ir-form" onSubmit={submit}>
          <label className="ir-label" htmlFor="ir-biz">
            Your business name
          </label>
          <div className="ir-row">
            <input
              id="ir-biz"
              ref={inputRef}
              className="ir-input"
              type="text"
              inputMode="text"
              autoComplete="organization"
              placeholder="Your business name and city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={phase === 'running'}
            />
            <button className="ir-go" type="submit" disabled={phase === 'running'}>
              {phase === 'running' ? 'Working…' : 'Show me →'}
            </button>
          </div>
          <p className="ir-fine">Free · about 10 seconds · no email</p>
          {notice && <p className="ir-notice">{notice}</p>}
        </form>
      )}

      {/* ---- In-flight: progress + optional chips ------------------------- */}
      {phase === 'running' && (
        <div className="ir-live">
          <div className="ir-steps">
            {steps.map((s, i) => (
              <div className="ir-step" key={s}>
                <span className={i === steps.length - 1 ? 'ir-spin' : 'ir-tick'} aria-hidden="true" />
                <span>{s}</span>
              </div>
            ))}
          </div>

          {found.length > 0 && (
            <ul className="ir-found" aria-live="polite">
              {found.map((d, i) => (
                <li className={`ir-found-i ir-t-${d.tone}`} key={`${i}-${d.text}`}>
                  <span className="ir-found-dot" aria-hidden="true" />
                  <span>{d.text}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="ir-ask">
            <p className="ir-ask-q">
              While I look — what stings most? <span className="ir-opt">optional</span>
            </p>
            <div className="ir-chips">
              {PAIN_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className={`ir-chip${pain === chip ? ' is-on' : ''}`}
                  onClick={() => choosePain(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---- Disambiguation ---------------------------------------------- */}
      {phase === 'candidates' && (
        <div className="ir-panel">
          <p className="ir-panel-h">I found a few — which one is you?</p>
          <div className="ir-cands">
            {candidates.map((c) => (
              <button key={c.id} type="button" className="ir-cand" onClick={() => pickCandidate(c)}>
                <strong>{c.name}</strong>
                {c.address && <span>{c.address}</span>}
              </button>
            ))}
          </div>
          <button type="button" className="ir-link" onClick={() => setPhase('tap')}>
            None of these is my business
          </button>
        </div>
      )}

      {/* ---- 3-tap fallback ---------------------------------------------- */}
      {phase === 'tap' && (
        <div className="ir-panel">
          <p className="ir-panel-h">
            I couldn&apos;t find you on Google — which is itself worth talking about. Three taps and
            I&apos;ll still show you something real.
          </p>

          <div className="ir-q">
            <span className="ir-q-l">What kind of business?</span>
            <div className="ir-chips">
              {TAP_CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`ir-chip${tapCategory === c.value ? ' is-on' : ''}`}
                  onClick={() => setTapCategory(c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ir-q">
            <span className="ir-q-l">Do you have a website?</span>
            <div className="ir-chips">
              <button
                type="button"
                className={`ir-chip${tapHasWebsite === true ? ' is-on' : ''}`}
                onClick={() => setTapHasWebsite(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`ir-chip${tapHasWebsite === false ? ' is-on' : ''}`}
                onClick={() => setTapHasWebsite(false)}
              >
                No
              </button>
            </div>
          </div>

          <div className="ir-q">
            <span className="ir-q-l">Who answers the phone?</span>
            <div className="ir-chips">
              {(['me', 'staff', 'nobody'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`ir-chip${tapPhone === v ? ' is-on' : ''}`}
                  onClick={() => setTapPhone(v)}
                >
                  {v === 'me' ? 'I do' : v === 'staff' ? 'My staff' : 'Often nobody'}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="ir-go ir-go-wide" onClick={submitTap} disabled={!tapCategory}>
            Show me →
          </button>
          <button type="button" className="ir-link" onClick={() => setPhase('idle')}>
            Search a different name
          </button>
        </div>
      )}

      {/* ---- Report ------------------------------------------------------- */}
      {phase === 'report' && report && (
        <div className="ir-report" ref={reportRef}>
          <header className="ir-head">
            <h2>{report.header.name}</h2>
            {report.header.address && <p className="ir-addr">{report.header.address}</p>}
            <div className="ir-meta">
              {report.header.categoryLabel && <span>{report.header.categoryLabel}</span>}
              {report.header.rating !== null && (
                <span>
                  ★ {report.header.rating.toFixed(1)}
                  {report.header.reviewCount !== null && ` · ${report.header.reviewCount} reviews`}
                </span>
              )}
              {report.header.website ? (
                <span className="ir-ok">Website found</span>
              ) : (
                <span className="ir-warn">No website</span>
              )}
            </div>
          </header>

          <section className="ir-sec">
            <h3>
              What&apos;s costing you right now
              {refining && <span className="ir-refine">sharpening…</span>}
            </h3>
            <ol className="ir-finds">
              {report.findings.map((f) => (
                <li key={f.code}>
                  <div className="ir-find-top">
                    <p className="ir-find-h">{f.headline}</p>
                    {f.impact && <span className="ir-impact">{f.impact}</span>}
                  </div>
                  <p className="ir-find-c">{f.consequence}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="ir-sec">
            <h3>What I&apos;d build for you</h3>
            <ul className="ir-builds">
              {report.builds.map((b) => (
                <li key={b.title}>
                  <p className="ir-build-t">{b.title}</p>
                  <p className="ir-build-w">{b.why}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="ir-sec ir-proof">
            <h3>See it work before you talk to me</h3>
            <a className="ir-demo" href={`tel:${DEMO_LINE}`}>
              <span className="ir-demo-l">Call the AI phone demo right now</span>
              <span className="ir-demo-n">{DEMO_LINE_PRETTY}</span>
              <span className="ir-demo-f">
                It&apos;s set up for a barbecue kitchen. Order out loud — it takes the
                order, and it tells you it&apos;s AI.
              </span>
            </a>
            <div className="ir-links">
              {DEMOS.map((b) => (
                <a
                  key={b.href}
                  href={b.href}
                  {...(b.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  {b.label} →
                </a>
              ))}
            </div>
          </section>

          {/*
            Value first, ask second — the capture only ever renders inside the
            'report' phase, after the findings, the builds and the proof. Agent E
            owns the component; nothing about its internals is styled here.
          */}
          <PhoneCapture report={report} query={query} pain={pain} />

          <section className="ir-cta">
            <p className="ir-cta-h">Want me to walk you through it?</p>
            <div className="ir-cta-row">
              <a className="ir-go ir-go-link" href={CAL} target="_blank" rel="noreferrer">
                Book 20 minutes
              </a>
              <a className="ir-alt" href={`sms:${PHONE}`}>
                Or text me
              </a>
            </div>
            <p className="ir-fine">
              {report.fallback
                ? 'Based on what you told me — a call gets you the specifics.'
                : 'Everything above came from your Google listing and your own site. Check any of it.'}
            </p>
          </section>

          <button
            type="button"
            className="ir-link"
            onClick={() => {
              setPhase('idle');
              setReport(null);
              setPain(null);
              painRef.current = null;
              refinedForRef.current = null;
              scrolledRef.current = false;
              setQuery('');
            }}
          >
            Run it on another business
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Scoped styles for the report. Every colour is a token declared once in
 * globals.css `@theme` — paper, ink, muted, hairline, surface. No hexes live
 * here, and the brand green never appears: it belongs to the wordmark dot.
 *
 * Two type weights only, 400 and 600. Tone on the discovery lines is carried by
 * a typographic mark and a weight, never by hue, so it survives greyscale.
 */
const CSS = `
.ir { width:100%; }
.ir :is(a,button,input):focus-visible { outline:2px solid var(--color-ink); outline-offset:2px; }

/* ---- form ---- */
.ir-form { display:flex; flex-direction:column; gap:8px; }
.ir-label { font-size:14px; font-weight:600; color:var(--color-muted); }
.ir-row { display:flex; gap:8px; flex-wrap:wrap; }
.ir-input { flex:1 1 220px; min-width:0; padding:14px 15px; font-size:17px; font-weight:400;
  color:var(--color-ink); background:var(--color-paper); border:1px solid var(--color-hairline);
  border-radius:8px; font-family:inherit; }
.ir-input::placeholder { color:var(--color-muted); }
.ir-input:focus { border-color:var(--color-ink); }
.ir-input:disabled { background:var(--color-surface); color:var(--color-muted); }
.ir-go { flex:0 0 auto; padding:14px 20px; font-size:17px; font-weight:600; color:var(--color-paper);
  background:var(--color-ink); border:1px solid var(--color-ink); border-radius:8px; cursor:pointer;
  font-family:inherit; transition:background .18s, border-color .18s; }
.ir-go:hover:not(:disabled) { background:var(--color-muted); border-color:var(--color-muted); }
.ir-go:disabled { opacity:.45; cursor:not-allowed; }
/* Once the row wraps, the button takes the whole line.
   .ir-input is flex:1 1 220px and .ir-go is flex:0 0 auto, so on a 390px phone
   the input ate line one and the button dropped to line two at its natural
   ~140px — leaving ~210px of dead white beside the most important CTA on the
   page, on a page where every other button is a full-width slab. The layout was
   quietly arguing for "Text me" over "Show me". It isn't now.
   (No backticks in this block: the whole stylesheet is a template literal.) */
@media (max-width: 460px) {
  .ir-row .ir-go { flex:1 1 100%; }
}
.ir-go-wide { align-self:flex-start; margin-top:4px; }
.ir-go-link { display:inline-block; text-decoration:none; }
.ir-fine { max-width:65ch; font-size:14px; font-weight:400; line-height:1.6; color:var(--color-muted); }
.ir-notice { max-width:65ch; font-size:15px; font-weight:400; color:var(--color-ink); }

/* ---- in-flight ---- */
.ir-live { margin-top:18px; display:flex; flex-direction:column; gap:18px; }
.ir-steps { display:flex; flex-direction:column; gap:9px; }
.ir-step { display:flex; align-items:center; gap:10px; font-size:16px; font-weight:400;
  color:var(--color-muted); }
.ir-tick, .ir-spin { width:14px; height:14px; flex:0 0 14px; border-radius:50%; position:relative; }
.ir-tick { background:var(--color-ink); }
.ir-tick:after { content:''; position:absolute; left:4px; top:5px; width:5px; height:3px;
  border-left:1.5px solid var(--color-paper); border-bottom:1.5px solid var(--color-paper);
  transform:rotate(-45deg); }
.ir-spin { border:2px solid var(--color-hairline); border-top-color:var(--color-ink);
  animation:ir-rot .7s linear infinite; }
@keyframes ir-rot { to { transform:rotate(360deg); } }

/* What we actually found, released one line at a time. Tone is a typographic
   mark plus a weight — never a colour — so it still reads in greyscale. */
.ir-found { list-style:none; display:flex; flex-direction:column; gap:8px;
  margin-top:15px; padding-top:15px; border-top:1px solid var(--color-hairline); }
.ir-found-i { display:flex; align-items:flex-start; gap:10px; max-width:65ch;
  font-size:16px; line-height:1.5; }
.ir-found-dot { flex:0 0 auto; width:1ch; font-weight:600; line-height:1.5; }
.ir-t-good { color:var(--color-ink); font-weight:400; }
.ir-t-good .ir-found-dot:before { content:'+'; }
.ir-t-bad { color:var(--color-ink); font-weight:600; }
.ir-t-bad .ir-found-dot:before { content:'−'; }
.ir-t-neutral { color:var(--color-muted); font-weight:400; }
.ir-t-neutral .ir-found-dot:before { content:'·'; }

.ir-ask { padding:16px; background:var(--color-surface); border:1px solid var(--color-hairline);
  border-radius:8px; }
.ir-ask-q { font-size:17px; font-weight:600; color:var(--color-ink); margin-bottom:10px; }
.ir-opt { font-size:14px; font-weight:400; color:var(--color-muted); margin-left:6px; }
.ir-chips { display:flex; flex-wrap:wrap; gap:8px; }
.ir-chip { padding:9px 13px; font-size:15px; font-weight:400; color:var(--color-ink);
  background:var(--color-paper); border:1px solid var(--color-hairline); border-radius:8px;
  cursor:pointer; font-family:inherit; transition:background .16s, border-color .16s, color .16s; }
.ir-chip:hover { border-color:var(--color-ink); }
.ir-chip.is-on { background:var(--color-ink); border-color:var(--color-ink);
  color:var(--color-paper); font-weight:600; }

/* ---- panels ---- */
.ir-panel { margin-top:4px; padding:20px; background:var(--color-paper);
  border:1px solid var(--color-hairline); border-radius:8px;
  display:flex; flex-direction:column; gap:16px; }
.ir-panel-h { max-width:65ch; font-size:17px; font-weight:400; line-height:1.6;
  color:var(--color-ink); }
.ir-q { display:flex; flex-direction:column; gap:8px; }
.ir-q-l { font-size:15px; font-weight:600; color:var(--color-ink); }
.ir-cands { display:flex; flex-direction:column; gap:8px; }
.ir-cand { display:flex; flex-direction:column; gap:3px; align-items:flex-start; text-align:left;
  padding:13px 15px; background:var(--color-surface); border:1px solid var(--color-hairline);
  border-radius:8px; cursor:pointer; font-family:inherit;
  transition:background .16s, border-color .16s; }
.ir-cand:hover { border-color:var(--color-ink); background:var(--color-paper); }
.ir-cand strong { font-size:17px; font-weight:600; color:var(--color-ink); }
.ir-cand span { font-size:14px; font-weight:400; color:var(--color-muted); }
.ir-link { align-self:flex-start; background:none; border:none; padding:6px 0; font-size:15px;
  font-weight:400; color:var(--color-ink); cursor:pointer; text-decoration:underline;
  text-underline-offset:3px; font-family:inherit; }

/* ---- report ---- */
/* The one animation on the whole site. Nothing else moves. */
.ir-report { margin-top:4px; display:flex; flex-direction:column; gap:26px;
  animation:ir-in .4s cubic-bezier(.2,.8,.2,1); }
@keyframes ir-in { from { opacity:0; transform:translateY(10px); } }

.ir-head { padding-bottom:18px; border-bottom:1px solid var(--color-hairline); }
.ir-head h2 { font-size:clamp(26px,5.5vw,32px); font-weight:600; letter-spacing:-.02em;
  line-height:1.1; color:var(--color-ink); }
.ir-addr { max-width:65ch; margin-top:6px; font-size:14px; font-weight:400;
  color:var(--color-muted); }
.ir-meta { margin-top:11px; display:flex; flex-wrap:wrap; gap:8px; }
.ir-meta span { padding:5px 10px; font-size:14px; font-weight:400; color:var(--color-muted);
  background:var(--color-surface); border:1px solid var(--color-hairline); border-radius:8px; }
.ir-meta .ir-ok { color:var(--color-muted); }
.ir-meta .ir-warn { color:var(--color-ink); font-weight:600; background:var(--color-paper);
  border-color:var(--color-ink); }

.ir-sec h3 { font-size:20px; font-weight:600; letter-spacing:-.01em; color:var(--color-ink);
  margin-bottom:14px; display:flex; align-items:baseline; flex-wrap:wrap; gap:9px; }
.ir-refine { font-size:14px; font-weight:400; color:var(--color-muted); }

.ir-finds { list-style:none; display:flex; flex-direction:column; gap:14px; counter-reset:f; }
.ir-finds li { counter-increment:f; padding:16px 16px 16px 44px; position:relative;
  background:var(--color-paper); border:1px solid var(--color-hairline); border-radius:8px; }
.ir-finds li:before { content:counter(f) '.'; position:absolute; left:16px; top:16px;
  font-size:17px; font-weight:600; line-height:1.5; color:var(--color-ink);
  font-variant-numeric:tabular-nums; }
.ir-finds li:first-child { border-color:var(--color-ink); }
.ir-find-top { display:flex; gap:10px; align-items:flex-start; justify-content:space-between; }
.ir-find-h { max-width:65ch; font-size:18px; font-weight:600; line-height:1.5;
  color:var(--color-ink); }
.ir-impact { flex:0 0 auto; padding:4px 8px; font-size:14px; font-weight:600;
  color:var(--color-ink); background:var(--color-surface); border-radius:8px; white-space:nowrap; }
.ir-find-c { max-width:65ch; margin-top:7px; font-size:17px; font-weight:400; line-height:1.6;
  color:var(--color-muted); }

.ir-builds { list-style:none; display:flex; flex-direction:column; gap:11px; }
.ir-builds li { padding:14px 16px; background:var(--color-surface);
  border:1px solid var(--color-hairline); border-left:2px solid var(--color-ink);
  border-radius:0 8px 8px 0; }
.ir-build-t { max-width:65ch; font-size:18px; font-weight:600; color:var(--color-ink); }
.ir-build-w { max-width:65ch; margin-top:5px; font-size:17px; font-weight:400; line-height:1.6;
  color:var(--color-muted); }

.ir-proof { padding:20px; background:var(--color-surface); border:1px solid var(--color-hairline);
  border-radius:8px; }
.ir-demo { display:flex; flex-direction:column; gap:4px; padding:16px; text-decoration:none;
  background:var(--color-paper); border:1px solid var(--color-hairline); border-radius:8px;
  transition:border-color .18s; }
.ir-demo:hover { border-color:var(--color-ink); }
.ir-demo-l { font-size:15px; font-weight:600; color:var(--color-ink); }
.ir-demo-n { font-size:24px; font-weight:600; letter-spacing:-.02em; color:var(--color-ink); }
.ir-demo-f { max-width:65ch; font-size:14px; font-weight:400; line-height:1.6;
  color:var(--color-muted); }
.ir-links { margin-top:13px; display:flex; flex-wrap:wrap; gap:14px; }
.ir-links a { font-size:15px; font-weight:400; color:var(--color-ink); text-decoration:underline;
  text-underline-offset:3px; }
.ir-links a:hover { color:var(--color-muted); }

.ir-cta { padding-top:22px; border-top:1px solid var(--color-hairline); }
.ir-cta-h { font-size:20px; font-weight:600; letter-spacing:-.01em; color:var(--color-ink);
  margin-bottom:13px; }
.ir-cta-row { display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
.ir-alt { font-size:17px; font-weight:600; color:var(--color-ink); text-decoration:none;
  padding:14px 20px; background:var(--color-paper); border:1px solid var(--color-ink);
  border-radius:8px; }
.ir-alt:hover { background:var(--color-surface); }
.ir-cta .ir-fine { margin-top:11px; }

/* Accessibility floor: the one animation, the spinner and every transition stop. */
@media (prefers-reduced-motion:reduce) {
  .ir-report, .ir-spin { animation:none; }
  .ir-go, .ir-chip, .ir-cand, .ir-demo, .ir-input { transition:none; }
}
`;
