'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

/**
 * The homepage hero's audit box (2026-10-04 design review, fix #1): the owner types their restaurant on the first
 * screen and lands on /audit with the scan already running. Without JavaScript the form still GETs /audit?q=….
 */
export function HeroAudit() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [err, setErr] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = q.trim();
    if (name.length < 2) {
      setErr(true);
      return;
    }
    router.push(`/audit?q=${encodeURIComponent(name)}`);
  }

  return (
    <form className="hm-audit" action="/audit" method="get" onSubmit={onSubmit}>
      <label className="hm-audit-l" htmlFor="hm-q">
        Your restaurant’s name and city
      </label>
      <div className="hm-audit-row">
        <input
          id="hm-q"
          name="q"
          className="fx-in hm-audit-in"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            if (err) setErr(false);
          }}
          placeholder="Restaurant name, Marietta"
          autoComplete="organization"
          enterKeyHint="go"
          maxLength={120}
          aria-invalid={err || undefined}
          aria-describedby="hm-q-hint"
        />
        <button type="submit" className="fx-btn fx-btn--p fx-btn--lg hm-audit-b">
          Check my restaurant
        </button>
      </div>
      <p className="hm-audit-hint" id="hm-q-hint">
        {err ? 'Type your restaurant’s name first. The city helps.' : 'Free · about 15 seconds · no email needed'}
      </p>
    </form>
  );
}

export default HeroAudit;
