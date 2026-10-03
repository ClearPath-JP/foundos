'use client';

import { useRef, useState, type FormEvent } from 'react';

import type { Discovery, GrowthScore, PlaceCandidate, Report, ReportEvent, ScoreStatus } from '@/lib/report/types';

/**
 * The Free Growth Audit — added 2026-10-03.
 *
 * Two halves on one page:
 *   1. The instant scan. Reuses POST /api/report (Google listing + a fetch of
 *      the site) and shows the Growth Score from lib/report/score.ts. Every
 *      line on the score card is a measured fact.
 *   2. The full-audit request. The questions from the audit brief, sent through
 *      POST /api/contact so it lands in Telegram like every other inquiry.
 *
 * If the scan can't find the restaurant (or Google is unavailable) the visitor
 * goes straight to the request form. Nothing here claims to have looked
 * something up that it didn't.
 */

type Phase = 'idle' | 'running' | 'candidates' | 'done' | 'manual';

const PRIORITIES = [
  'More online orders',
  'More catering inquiries',
  'Better Google visibility',
  'A better website',
  'More repeat customers',
  'Not sure, show me',
] as const;

const MARK: Record<ScoreStatus, { sym: string; word: string }> = {
  pass: { sym: '✓', word: 'Looks good' },
  warn: { sym: '!', word: 'Needs work' },
  fail: { sym: '✕', word: 'Missing' },
  unknown: { sym: '?', word: 'Not checked' },
};

async function* readNdjson(body: ReadableStream<Uint8Array>): AsyncGenerator<ReportEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
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
          /* a partial line; skip it */
        }
      }
    }
  } finally {
    reader.cancel().catch(() => {});
  }
}

export default function GrowthAudit({ phone, phonePretty, email }: { phone: string; phonePretty: string; email: string }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [query, setQuery] = useState('');
  const [step, setStep] = useState('');
  const [found, setFound] = useState<Discovery[]>([]);
  const [candidates, setCandidates] = useState<PlaceCandidate[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function run(payload: { mode: 'search'; query: string } | { mode: 'place'; placeId: string }) {
    setPhase('running');
    setStep('Looking up your restaurant');
    setFound([]);
    setReport(null);
    setNotice(null);

    let latest: Report | null = null;
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, answers: {} }),
      });
      if (!res.ok || !res.body) throw new Error('bad response');

      for await (const ev of readNdjson(res.body)) {
        if (ev.type === 'progress') setStep(ev.step);
        else if (ev.type === 'discovery') setFound((d) => [...d, ev.discovery]);
        else if (ev.type === 'candidates') {
          setCandidates(ev.candidates);
          setPhase('candidates');
          return;
        } else if (ev.type === 'notice') {
          setNotice(
            ev.message === 'needs_tap_fallback'
              ? 'We couldn’t look that one up automatically. Send the details below and Josh will run the audit by hand.'
              : ev.message
          );
          setPhase('manual');
          return;
        } else if (ev.type === 'report') {
          latest = ev.report;
          setReport(ev.report);
        }
      }
    } catch {
      setNotice('The scan didn’t finish. Send the details below and Josh will run the audit by hand.');
      setPhase('manual');
      return;
    }

    if (latest?.score) setPhase('done');
    else {
      setNotice('We couldn’t score that one automatically. Send the details below and Josh will run the audit by hand.');
      setPhase('manual');
    }
  }

  function onScan(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q.length < 2) {
      setNotice('Type your restaurant’s name, and the city helps.');
      return;
    }
    void run({ mode: 'search', query: q });
  }

  const score = report?.score;

  return (
    <div className="ga">
      <style>{CSS}</style>

      {/* ── 1. The scan ─────────────────────────────────────────────── */}
      {(phase === 'idle' || phase === 'running') && (
        <form className="ga-scan" onSubmit={onScan}>
          <label className="fx-label" htmlFor="ga-q">
            Restaurant name and city
          </label>
          <div className="ga-row">
            <input
              id="ga-q"
              className="fx-in"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Your restaurant, Marietta"
              autoComplete="organization"
              maxLength={120}
              disabled={phase === 'running'}
            />
            <button type="submit" className="fx-btn fx-btn--p" disabled={phase === 'running'}>
              {phase === 'running' ? 'Scanning…' : 'Run my growth scan →'}
            </button>
          </div>
          <p className="fx-hint">Free. About 15 seconds. No email needed to see your score.</p>
          {notice && phase === 'idle' && <p className="fx-err">{notice}</p>}
          {phase === 'idle' && (
            <button type="button" className="ga-link" onClick={() => setPhase('manual')}>
              Skip the scan and ask for the full audit
            </button>
          )}
        </form>
      )}

      {phase === 'running' && (
        <div className="ga-live" aria-live="polite">
          <p className="ga-step">
            <span className="ga-spin" aria-hidden="true" />
            {step}
          </p>
          {found.length > 0 && (
            <ul className="ga-found" role="list">
              {found.map((d, i) => (
                <li key={`${i}-${d.text}`} className={`ga-f ga-f--${d.tone}`}>
                  {d.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {phase === 'candidates' && (
        <div className="ga-cands">
          <p className="ga-h">We found a few. Which one is yours?</p>
          {candidates.map((c) => (
            <button key={c.id} type="button" className="ga-cand" onClick={() => void run({ mode: 'place', placeId: c.id })}>
              <strong>{c.name}</strong>
              {c.address && <span>{c.address}</span>}
            </button>
          ))}
          <button type="button" className="ga-link" onClick={() => setPhase('manual')}>
            None of these. Ask for the audit by hand.
          </button>
        </div>
      )}

      {phase === 'done' && report && score && <ScoreCard name={report.header.name} score={score} />}

      {/* ── 2. The full-audit request ───────────────────────────────── */}
      {(phase === 'done' || phase === 'manual') && (
        <div className="fx-panel ga-req">
          {phase === 'manual' && notice && <p className="ga-notice">{notice}</p>}
          <p className="ga-h">{phase === 'done' ? 'Get your full audit' : 'Request your free growth audit'}</p>
          <p className="fx-hint" style={{ marginBottom: 20 }}>
            {phase === 'done'
              ? 'Josh goes through each item by hand, adds what a scan can’t see, and sends you the fixes in plain English. Free, and no obligation.'
              : 'Josh reviews your website, Google listing, phone experience, ordering and follow-up by hand, and sends you what he finds. Free, and no obligation.'}
          </p>
          <AuditRequestForm
            business={report?.header.name ?? query.trim()}
            website={report?.header.website ?? ''}
            score={score ?? null}
            phone={phone}
            phonePretty={phonePretty}
            email={email}
          />
        </div>
      )}
    </div>
  );
}

function ScoreCard({ name, score }: { name: string; score: GrowthScore }) {
  return (
    <section className="ga-card" aria-labelledby="ga-score-h">
      <p className="fx-kicker">Your foundos Growth Score</p>
      <h2 className="ga-name" id="ga-score-h">
        {name}
      </h2>
      <p className="ga-num">
        <span className="ga-n">{score.score}</span>
        <span className="ga-of">/ 100</span>
      </p>
      <ul className="ga-areas" role="list">
        {score.areas.map((a) => (
          <li key={a.key} className={`ga-a ga-a--${a.status}`}>
            <span className="ga-mark" aria-hidden="true">
              {MARK[a.status].sym}
            </span>
            <div>
              <p className="ga-a-t">
                {a.label} <span className="ga-a-w">· {MARK[a.status].word}</span>
              </p>
              <p className="ga-a-d">{a.note}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="ga-opps">
        {score.opportunities === 0
          ? 'No gaps a scan can see. The full audit looks at what it can’t.'
          : `${score.opportunities} growth ${score.opportunities === 1 ? 'opportunity' : 'opportunities'} found.`}
      </p>
      <p className="fx-hint">
        A quick outside check of public information, scored evenly across the areas we could measure. It isn’t a
        Google ranking.
      </p>
    </section>
  );
}

type FieldErrors = Partial<Record<'name' | 'business' | 'contact' | 'website', string>>;
type SendState = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

function AuditRequestForm({
  business,
  website,
  score,
  phone,
  phonePretty,
  email,
}: {
  business: string;
  website: string;
  score: GrowthScore | null;
  phone: string;
  phonePretty: string;
  email: string;
}) {
  const [method, setMethod] = useState<'text' | 'email'>('text');
  const [state, setState] = useState<SendState>({ kind: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const submissionId = useRef<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === 'sending') return;
    const f = new FormData(event.currentTarget);
    const priority = String(f.get('priority') ?? '') || 'Not answered';
    const ordering = String(f.get('ordering') ?? '') || 'Not answered';
    const help = [
      'FREE GROWTH AUDIT REQUEST',
      `Biggest priority: ${priority}`,
      `Takes direct online orders: ${ordering}`,
      score
        ? `Scan score: ${score.score}/100 · ${score.areas
            .filter((a) => a.status === 'warn' || a.status === 'fail')
            .map((a) => a.label)
            .join(', ') || 'no gaps'}`
        : 'Scan: not run or not found',
    ].join('\n');

    const payload = {
      name: String(f.get('name') ?? '').trim(),
      business: String(f.get('business') ?? '').trim(),
      website: String(f.get('website') ?? '').trim(),
      help,
      interest: 'not-sure',
      method,
      contact: String(f.get('contact') ?? '').trim(),
      company_fax: String(f.get('company_fax') ?? ''),
    };

    const next: FieldErrors = {};
    if (!payload.name) next.name = 'Please add your name.';
    if (!payload.business) next.business = 'Please add your restaurant’s name.';
    if (!payload.contact) next.contact = method === 'text' ? 'Please add a phone number.' : 'Please add an email.';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    submissionId.current ??= crypto.randomUUID();
    setState({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, id: submissionId.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; field?: keyof FieldErrors };
      if (res.ok && data.ok) {
        setState({ kind: 'sent' });
        return;
      }
      if (data.field) setErrors({ [data.field]: data.error ?? 'Please check this field.' });
      setState({ kind: 'error', message: data.error ?? 'Something went wrong on my end.' });
    } catch {
      setState({ kind: 'error', message: 'Something went wrong on my end.' });
    }
  }

  if (state.kind === 'sent') {
    return (
      <div className="fx-done" role="status">
        <p>
          <strong>Your audit request is in.</strong> Josh will go through it himself and get back to you within one
          business day.
        </p>
      </div>
    );
  }

  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p className="fx-err" id={`ge-${k}`}>
        {errors[k]}
      </p>
    ) : null;
  const invalid = (k: keyof FieldErrors) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `ge-${k}` : undefined,
  });

  return (
    <form className="fx-form" onSubmit={onSubmit} noValidate>
      <div className="fx-field">
        <label className="fx-label" htmlFor="ga-business">
          Restaurant name
        </label>
        <input id="ga-business" name="business" className="fx-in" defaultValue={business} maxLength={120} {...invalid('business')} />
        {err('business')}
      </div>

      <div className="fx-field">
        <label className="fx-label" htmlFor="ga-website">
          Restaurant website <span style={{ fontWeight: 400 }}>(optional)</span>
        </label>
        <input id="ga-website" name="website" className="fx-in" inputMode="url" defaultValue={website} maxLength={300} {...invalid('website')} />
        {err('website')}
      </div>

      <fieldset className="ga-pick">
        <legend>What’s your biggest priority?</legend>
        {PRIORITIES.map((p) => (
          <label key={p} className="ga-opt">
            <input type="radio" name="priority" value={p} />
            {p}
          </label>
        ))}
      </fieldset>

      <fieldset className="fx-radios">
        <legend>Do you take direct online orders now?</legend>
        {(['Yes', 'No'] as const).map((v) => (
          <label key={v} className="fx-radio">
            <input type="radio" name="ordering" value={v} />
            {v}
          </label>
        ))}
      </fieldset>

      <div className="fx-field">
        <label className="fx-label" htmlFor="ga-name">
          Your name
        </label>
        <input id="ga-name" name="name" className="fx-in" autoComplete="name" maxLength={80} {...invalid('name')} />
        {err('name')}
      </div>

      <fieldset className="fx-radios">
        <legend>Where should we send your audit?</legend>
        {(['text', 'email'] as const).map((m) => (
          <label key={m} className="fx-radio">
            <input
              type="radio"
              name="method"
              value={m}
              checked={method === m}
              onChange={() => {
                setMethod(m);
                setErrors((e) => ({ ...e, contact: undefined }));
              }}
            />
            {m === 'text' ? 'Text' : 'Email'}
          </label>
        ))}
      </fieldset>

      <div className="fx-field">
        <label className="fx-label" htmlFor="ga-contact">
          {method === 'text' ? 'Mobile number' : 'Email address'}
        </label>
        <input
          key={method}
          id="ga-contact"
          name="contact"
          className="fx-in"
          type={method === 'text' ? 'tel' : 'email'}
          inputMode={method === 'text' ? 'tel' : 'email'}
          autoComplete={method === 'text' ? 'tel' : 'email'}
          maxLength={method === 'text' ? 32 : 254}
          {...invalid('contact')}
        />
        {err('contact')}
      </div>

      <div className="fx-hp" aria-hidden="true">
        <label htmlFor="ga-fax">Company fax</label>
        <input id="ga-fax" name="company_fax" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="fx-consent">
        By sending, you agree that Josh may contact you about this audit. This does not sign you up for marketing
        messages.
      </p>

      {state.kind === 'error' && (
        <p className="fx-alert" role="alert">
          {state.message} Your details are still here. Try again, or reach me directly:{' '}
          <a href={`sms:${phone}`}>text {phonePretty}</a> or <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}

      <button type="submit" className="fx-btn fx-btn--p" disabled={state.kind === 'sending'}>
        {state.kind === 'sending' ? 'Sending…' : 'Get my free growth audit →'}
      </button>
    </form>
  );
}

const CSS = `
.ga{display:grid;gap:28px;}
.ga-scan{display:grid;gap:10px;}
.ga-row{display:flex;flex-direction:column;gap:10px;}
@media (min-width:640px){.ga-row{flex-direction:row;}.ga-row .fx-in{flex:1;}.ga-row .fx-btn{flex:0 0 auto;}}
.ga-link{justify-self:start;background:none;border:0;padding:4px 0;font:inherit;font-size:16px;color:var(--p);
  text-decoration:underline;text-underline-offset:3px;cursor:pointer;}
.ga-live{display:grid;gap:14px;}
.ga-step{display:flex;align-items:center;gap:12px;font-weight:700;}
.ga-spin{width:18px;height:18px;border-radius:50%;border:2.5px solid var(--lav);border-top-color:var(--p);
  animation:ga-spin .8s linear infinite;}
@keyframes ga-spin{to{transform:rotate(360deg);}}
@media (prefers-reduced-motion:reduce){.ga-spin{animation:none;}}
.ga-found{list-style:none;margin:0;padding:0;display:grid;gap:8px;}
.ga-f{padding:10px 14px;border-radius:10px;background:var(--tint);border:1px solid var(--line);font-size:16px;}
.ga-f--bad{border-left:4px solid var(--pink);}
.ga-f--good{border-left:4px solid var(--p);}
.ga-h{font-size:22px;font-weight:800;line-height:1.25;margin-bottom:6px;}
.ga-cands{display:grid;gap:10px;}
.ga-cand{display:grid;gap:2px;text-align:left;padding:14px 16px;border:1.5px solid var(--line);border-radius:var(--r);
  background:#fff;font:inherit;cursor:pointer;}
.ga-cand:hover{border-color:var(--p);}
.ga-cand span{font-size:15px;color:var(--muted);}
.ga-notice{padding:12px 14px;border-radius:10px;background:var(--lav);margin-bottom:16px;font-size:16px;}
.ga-card{padding:28px 22px;border-radius:var(--r);border:1px solid var(--line);background:#fff;
  box-shadow:0 18px 40px -24px rgba(45,20,90,.35);}
@media (min-width:640px){.ga-card{padding:36px;}}
.ga-name{font-size:24px;font-weight:800;line-height:1.2;margin:8px 0 0;}
.ga-num{display:flex;align-items:baseline;gap:8px;margin:14px 0 20px;}
.ga-n{font-size:72px;font-weight:800;line-height:1;letter-spacing:-.03em;
  background:var(--stripe);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ga-of{font-size:22px;font-weight:700;color:var(--muted);}
.ga-areas{list-style:none;margin:0;padding:0;display:grid;gap:4px;}
.ga-a{display:grid;grid-template-columns:32px 1fr;gap:12px;align-items:start;padding:12px 0;border-top:1px solid var(--line);}
.ga-mark{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;font-weight:800;font-size:15px;}
.ga-a--pass .ga-mark{background:var(--lav);color:var(--p);}
.ga-a--warn .ga-mark{background:#FDF0D5;color:#8A5300;}
.ga-a--fail .ga-mark{background:#FBE3F1;color:#A3207A;}
.ga-a--unknown .ga-mark{background:#F0EEF3;color:var(--muted);}
.ga-a-t{font-weight:700;}
.ga-a-w{font-weight:500;color:var(--muted);font-size:15px;}
.ga-a-d{font-size:16px;color:var(--muted);}
.ga-opps{margin:18px 0 8px;font-size:20px;font-weight:800;color:var(--p);}
.ga-pick{display:grid;gap:8px;border:0;padding:0;margin:0;}
@media (min-width:640px){.ga-pick{grid-template-columns:1fr 1fr;}}
.ga-pick legend{font-weight:700;font-size:16px;margin-bottom:8px;padding:0;}
.ga-opt{display:flex;align-items:center;gap:10px;min-height:48px;padding:8px 14px;border:1.5px solid #CFC8DC;
  border-radius:10px;font-size:16px;cursor:pointer;}
.ga-opt:has(input:checked){border-color:var(--p);background:var(--tint);}
.ga-opt input{accent-color:var(--p);}
`;
