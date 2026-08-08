'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
              placeholder="Caribbean Spice, Marietta"
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
          <button type="button" className="ir-link" onClick={() => setPhase('idle')}>
            None of these — try again
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

const CSS = `
.ir { --v:#7c3aed; --v2:#8b5cf6; --ink:#15131f; --mut:#5b5870; --dim:#8f8ca3;
  --line:rgba(21,19,31,.10); --soft:#faf9fe; width:100%; }

/* form */
.ir-form { display:flex; flex-direction:column; gap:8px; }
.ir-label { font-size:.78rem; font-weight:600; letter-spacing:.02em; color:var(--mut); }
.ir-row { display:flex; gap:8px; flex-wrap:wrap; }
.ir-input { flex:1 1 220px; min-width:0; padding:15px 16px; font-size:1rem; color:var(--ink);
  background:#fff; border:1.5px solid var(--line); border-radius:12px; font-family:inherit; }
.ir-input:focus { outline:none; border-color:var(--v); box-shadow:0 0 0 4px rgba(124,58,237,.10); }
.ir-input:disabled { background:var(--soft); color:var(--dim); }
.ir-go { flex:0 0 auto; padding:15px 22px; font-size:1rem; font-weight:650; color:#fff;
  background:var(--ink); border:none; border-radius:12px; cursor:pointer; font-family:inherit;
  transition:background .18s, transform .18s; }
.ir-go:hover:not(:disabled) { background:var(--v); transform:translateY(-1px); }
.ir-go:disabled { opacity:.45; cursor:not-allowed; }
.ir-go-wide { width:100%; margin-top:4px; }
.ir-go-link { display:inline-block; text-decoration:none; text-align:center; }
.ir-fine { font-size:.8rem; color:var(--dim); }
.ir-notice { font-size:.88rem; color:var(--v); }

/* in-flight */
.ir-live { margin-top:18px; display:flex; flex-direction:column; gap:18px; }
.ir-steps { display:flex; flex-direction:column; gap:9px; }
.ir-step { display:flex; align-items:center; gap:10px; font-size:.92rem; color:var(--mut); }

/* what we actually found, revealed one line at a time */
.ir-found { list-style:none; display:flex; flex-direction:column; gap:8px;
  margin-top:15px; padding-top:15px; border-top:1px solid #e8e6f0; }
.ir-found-i { display:flex; align-items:flex-start; gap:10px; font-size:.92rem;
  line-height:1.45; animation:irFound .3s ease-out both; }
.ir-found-dot { flex:none; width:6px; height:6px; border-radius:50%; margin-top:.52em; }
.ir-t-good { color:#2f7d5b; }
.ir-t-good .ir-found-dot { background:#2f7d5b; }
.ir-t-bad { color:var(--ink); font-weight:550; }
.ir-t-bad .ir-found-dot { background:#c9761f; }
.ir-t-neutral { color:var(--mut); }
.ir-t-neutral .ir-found-dot { background:var(--dim); }
@keyframes irFound { from { opacity:0; transform:translateY(-3px); } to { opacity:1; transform:none; } }
@media (prefers-reduced-motion:reduce) { .ir-found-i { animation:none; } }
.ir-tick, .ir-spin { width:15px; height:15px; flex:0 0 15px; border-radius:50%; position:relative; }
.ir-tick { background:var(--v); }
.ir-tick:after { content:''; position:absolute; left:4px; top:6px; width:6px; height:3px;
  border-left:1.6px solid #fff; border-bottom:1.6px solid #fff; transform:rotate(-45deg); }
.ir-spin { border:2px solid rgba(124,58,237,.22); border-top-color:var(--v);
  animation:ir-rot .7s linear infinite; }
@keyframes ir-rot { to { transform:rotate(360deg); } }

.ir-ask { padding:16px; background:var(--soft); border:1px solid var(--line); border-radius:14px; }
.ir-ask-q { font-size:.92rem; font-weight:600; color:var(--ink); margin-bottom:10px; }
.ir-opt { font-size:.72rem; font-weight:500; color:var(--dim); text-transform:uppercase;
  letter-spacing:.06em; margin-left:6px; }
.ir-chips { display:flex; flex-wrap:wrap; gap:8px; }
.ir-chip { padding:9px 14px; font-size:.88rem; font-weight:550; color:var(--mut); background:#fff;
  border:1.5px solid var(--line); border-radius:999px; cursor:pointer; font-family:inherit;
  transition:all .16s; }
.ir-chip:hover { border-color:var(--v2); color:var(--ink); }
.ir-chip.is-on { background:var(--v); border-color:var(--v); color:#fff; }

/* panels */
.ir-panel { margin-top:4px; padding:20px; background:#fff; border:1.5px solid var(--line);
  border-radius:16px; display:flex; flex-direction:column; gap:16px; }
.ir-panel-h { font-size:1rem; font-weight:600; color:var(--ink); line-height:1.45; }
.ir-q { display:flex; flex-direction:column; gap:8px; }
.ir-q-l { font-size:.85rem; font-weight:600; color:var(--mut); }
.ir-cands { display:flex; flex-direction:column; gap:8px; }
.ir-cand { display:flex; flex-direction:column; gap:3px; align-items:flex-start; text-align:left;
  padding:13px 15px; background:var(--soft); border:1.5px solid var(--line); border-radius:12px;
  cursor:pointer; font-family:inherit; transition:all .16s; }
.ir-cand:hover { border-color:var(--v); background:#fff; }
.ir-cand strong { font-size:.98rem; color:var(--ink); font-weight:650; }
.ir-cand span { font-size:.85rem; color:var(--dim); }
.ir-link { align-self:flex-start; background:none; border:none; padding:6px 0; font-size:.86rem;
  font-weight:550; color:var(--v); cursor:pointer; text-decoration:underline;
  text-underline-offset:3px; font-family:inherit; }

/* report */
.ir-report { margin-top:4px; display:flex; flex-direction:column; gap:26px;
  animation:ir-in .4s cubic-bezier(.2,.8,.2,1); }
@keyframes ir-in { from { opacity:0; transform:translateY(10px); } }
.ir-head { padding-bottom:18px; border-bottom:2px solid var(--line); }
.ir-head h2 { font-size:clamp(1.5rem,6vw,2rem); font-weight:800; letter-spacing:-.03em;
  line-height:1.1; color:var(--ink); }
.ir-addr { margin-top:5px; font-size:.9rem; color:var(--mut); }
.ir-meta { margin-top:11px; display:flex; flex-wrap:wrap; gap:8px; }
.ir-meta span { padding:5px 11px; font-size:.79rem; font-weight:600; color:var(--mut);
  background:var(--soft); border:1px solid var(--line); border-radius:999px; }
.ir-meta .ir-warn { color:#b4256b; background:rgba(219,39,119,.07); border-color:rgba(219,39,119,.2); }
.ir-meta .ir-ok { color:#5b21b6; background:rgba(124,58,237,.07); border-color:rgba(124,58,237,.2); }

.ir-sec h3 { font-size:.76rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em;
  color:var(--v); margin-bottom:14px; display:flex; align-items:center; gap:9px; }
.ir-refine { font-size:.68rem; font-weight:500; text-transform:none; letter-spacing:0;
  color:var(--dim); }

.ir-finds { list-style:none; display:flex; flex-direction:column; gap:14px; counter-reset:f; }
.ir-finds li { counter-increment:f; padding:16px 16px 16px 46px; position:relative;
  background:#fff; border:1.5px solid var(--line); border-radius:14px; }
.ir-finds li:before { content:counter(f); position:absolute; left:16px; top:16px; width:22px;
  height:22px; display:grid; place-items:center; font-size:.72rem; font-weight:700; color:#fff;
  background:var(--ink); border-radius:50%; }
.ir-finds li:first-child { border-color:rgba(124,58,237,.32); box-shadow:0 3px 18px rgba(124,58,237,.07); }
.ir-finds li:first-child:before { background:var(--v); }
.ir-find-top { display:flex; gap:10px; align-items:flex-start; justify-content:space-between; }
.ir-find-h { font-size:1rem; font-weight:640; line-height:1.42; color:var(--ink); }
.ir-impact { flex:0 0 auto; padding:4px 9px; font-size:.71rem; font-weight:700; color:var(--v);
  background:rgba(124,58,237,.08); border-radius:6px; white-space:nowrap; }
.ir-find-c { margin-top:7px; font-size:.91rem; line-height:1.5; color:var(--mut); }

.ir-builds { list-style:none; display:flex; flex-direction:column; gap:11px; }
.ir-builds li { padding:15px 16px; background:var(--soft); border:1px solid var(--line);
  border-left:3px solid var(--v); border-radius:0 12px 12px 0; }
.ir-build-t { font-size:.97rem; font-weight:650; color:var(--ink); }
.ir-build-w { margin-top:5px; font-size:.89rem; line-height:1.5; color:var(--mut); }

.ir-proof { padding:20px; background:var(--ink); border-radius:16px; }
.ir-proof h3 { color:var(--v2); }
.ir-demo { display:flex; flex-direction:column; gap:3px; padding:16px; text-decoration:none;
  background:rgba(255,255,255,.05); border:1.5px solid rgba(139,92,246,.32); border-radius:12px;
  transition:all .18s; }
.ir-demo:hover { background:rgba(139,92,246,.13); border-color:var(--v2); }
.ir-demo-l { font-size:.83rem; font-weight:600; color:#c3bfe0; }
.ir-demo-n { font-size:1.32rem; font-weight:800; letter-spacing:-.02em; color:#fff; }
.ir-demo-f { font-size:.8rem; color:#9a98ab; }
.ir-links { margin-top:13px; display:flex; flex-wrap:wrap; gap:14px; }
.ir-links a { font-size:.86rem; font-weight:550; color:#c3bfe0; text-decoration:none; }
.ir-links a:hover { color:#fff; }

.ir-cta { padding-top:22px; border-top:2px solid var(--line); }
.ir-cta-h { font-size:1.12rem; font-weight:700; letter-spacing:-.02em; color:var(--ink);
  margin-bottom:13px; }
.ir-cta-row { display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
.ir-alt { font-size:.92rem; font-weight:600; color:var(--v); text-decoration:none;
  padding:15px 4px; }
.ir-alt:hover { text-decoration:underline; text-underline-offset:3px; }
.ir-cta .ir-fine { margin-top:11px; }
`;
