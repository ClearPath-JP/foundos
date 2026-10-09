'use client';

import Script from 'next/script';
import { useEffect, useState, useSyncExternalStore } from 'react';

import { CONSENT_VERSION, FORWARDED_PARAMS, TALLY_EMBED_URL, TALLY_FORM_URL } from '@/config/audit';

/** Only the allowlisted campaign params, read from this page's URL. */
function allowedParams(search: string): URLSearchParams {
  const from = new URLSearchParams(search);
  const out = new URLSearchParams();
  for (const key of FORWARDED_PARAMS) {
    const v = from.get(key);
    if (v) out.set(key, v.slice(0, 100));
  }
  /* Fixed by the page, never taken from the link: which wording of the notice the visitor saw. */
  out.set('consent_version', CONSENT_VERSION);
  return out;
}

function withParams(base: string, params: URLSearchParams): string {
  const qs = params.toString();
  if (!qs) return base;
  return base + (base.includes('?') ? '&' : '?') + qs;
}

const noopSubscribe = () => () => {};

/**
 * The live Tally form.
 *
 * Why the iframe gets `src` and not Tally's `data-tally-src`: with data-tally-src, embed.js appends the page's
 * ENTIRE query string to the form URL. We build the URL ourselves with the allowlist only, and embed.js still
 * picks up `src` iframes containing dynamicHeight=1 and resizes them — it just doesn't touch the params.
 *
 * 2026-10-09 (v2 offer): the instant AI first look was removed — the audit is Josh's personal review only. The
 * page still listens for Tally's FormSubmitted message, but only to shrink the frame to the success message.
 */
export function AuditForm() {
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => null,
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://tally.so' || typeof e.data !== 'string' || !e.data.includes('Tally.FormSubmitted')) return;
      setSubmitted(true);
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!TALLY_EMBED_URL) {
    return (
      <p className="lp-form-missing">
        The request form is being connected. Email <a href="mailto:josh@foundos.ai">josh@foundos.ai</a> with your
        business name and website or profile link in the meantime.
      </p>
    );
  }

  let params: URLSearchParams | null = null;
  if (search !== null) {
    params = allowedParams(search);
    params.set('originPage', '/');
  }
  const fallbackParams = params ? new URLSearchParams(params) : new URLSearchParams();
  fallbackParams.delete('originPage');

  return (
    <>
      {/* After submit Tally shows a short success message but keeps the tall height; collapse the frame to fit. */}
      <div className={submitted ? 'lp-form-frame lp-form-frame--done' : 'lp-form-frame'}>
        {params ? (
          <iframe
            src={withParams(TALLY_EMBED_URL, params)}
            width="100%"
            height="900"
            title="Free audit request form"
            className="lp-iframe"
          />
        ) : (
          <div className="lp-iframe lp-iframe--wait" aria-hidden="true" />
        )}
      </div>
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
      <p className="lp-form-alt">
        Form not loading?{' '}
        <a href={withParams(TALLY_FORM_URL, fallbackParams)} target="_blank" rel="noopener">
          Open the form directly
        </a>
      </p>
    </>
  );
}

export default AuditForm;
