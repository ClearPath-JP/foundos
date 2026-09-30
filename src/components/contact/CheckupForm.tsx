'use client';

import { useRef, useState, type FormEvent } from 'react';

type Method = 'text' | 'email';
type FieldErrors = Partial<Record<'name' | 'business' | 'help' | 'contact' | 'website', string>>;
type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

type Props = { email: string; phone: string; phonePretty: string };

/**
 * The free tech checkup request (brief §3, "Form").
 *
 * - The form is uncontrolled and never reset on error, so nothing typed is lost.
 * - One submission ID per page view: a double tap or a retry after a timeout
 *   reuses it, and the server drops the duplicate instead of pinging twice.
 * - Only the contact field for the chosen method is shown and sent.
 */
export function CheckupForm({ email, phone, phonePretty }: Props) {
  const [method, setMethod] = useState<Method>('text');
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const submissionId = useRef<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === 'sending') return;
    const f = new FormData(event.currentTarget);
    const payload = {
      name: String(f.get('name') ?? '').trim(),
      business: String(f.get('business') ?? '').trim(),
      website: String(f.get('website') ?? '').trim(),
      help: String(f.get('help') ?? '').trim(),
      method,
      contact: String(f.get('contact') ?? '').trim(),
      company_fax: String(f.get('company_fax') ?? ''),
    };

    const next: FieldErrors = {};
    if (!payload.name) next.name = 'Please add your name.';
    if (!payload.business) next.business = 'Please add your business name.';
    if (!payload.help) next.help = 'Tell me a little about what you’d like help with.';
    if (!payload.contact) next.contact = method === 'text' ? 'Please add a phone number.' : 'Please add an email.';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setState({ kind: 'idle' });
      const first = event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
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
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        field?: keyof FieldErrors;
      };
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
          <strong>Thanks—your request is in.</strong> I’ll review it personally and follow up using the contact details
          you shared.
        </p>
      </div>
    );
  }

  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p className="fx-err" id={`e-${k}`}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <form className="fx-form" onSubmit={onSubmit} noValidate>
      <div className="fx-field">
        <label className="fx-label" htmlFor="f-name">
          Your name
        </label>
        <input
          id="f-name"
          name="name"
          className="fx-in"
          autoComplete="name"
          maxLength={80}
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'e-name' : undefined}
        />
        {err('name')}
      </div>

      <div className="fx-field">
        <label className="fx-label" htmlFor="f-business">
          Business name
        </label>
        <input
          id="f-business"
          name="business"
          className="fx-in"
          autoComplete="organization"
          maxLength={120}
          required
          aria-invalid={errors.business ? true : undefined}
          aria-describedby={errors.business ? 'e-business' : undefined}
        />
        {err('business')}
      </div>

      <div className="fx-field">
        <label className="fx-label" htmlFor="f-website">
          Website or business profile <span style={{ fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id="f-website"
          name="website"
          className="fx-in"
          inputMode="url"
          autoComplete="url"
          maxLength={300}
          aria-invalid={errors.website ? true : undefined}
          aria-describedby={errors.website ? 'e-website h-website' : 'h-website'}
        />
        <p className="fx-hint" id="h-website">
          No website yet? Leave this blank.
        </p>
        {err('website')}
      </div>

      <div className="fx-field">
        <label className="fx-label" htmlFor="f-help">
          What would you like help with?
        </label>
        <textarea
          id="f-help"
          name="help"
          className="fx-in"
          maxLength={1500}
          required
          placeholder="I’m not sure—I’d like a fresh look."
          aria-invalid={errors.help ? true : undefined}
          aria-describedby={errors.help ? 'e-help' : undefined}
        />
        {err('help')}
      </div>

      <fieldset className="fx-radios">
        <legend>How should I reach you?</legend>
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
        <label className="fx-label" htmlFor="f-contact">
          {method === 'text' ? 'Mobile number' : 'Email address'}
        </label>
        <input
          key={method}
          id="f-contact"
          name="contact"
          className="fx-in"
          type={method === 'text' ? 'tel' : 'email'}
          inputMode={method === 'text' ? 'tel' : 'email'}
          autoComplete={method === 'text' ? 'tel' : 'email'}
          maxLength={method === 'text' ? 32 : 254}
          required
          aria-invalid={errors.contact ? true : undefined}
          aria-describedby={errors.contact ? 'e-contact' : undefined}
        />
        {err('contact')}
      </div>

      {/* Honeypot. Hidden from people and screen readers; bots fill it in. */}
      <div className="fx-hp" aria-hidden="true">
        <label htmlFor="f-fax">Company fax</label>
        <input id="f-fax" name="company_fax" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="fx-consent">
        By submitting, you agree that Josh may contact you about this request. This does not sign you up for marketing
        messages.
      </p>

      {state.kind === 'error' && (
        <p className="fx-alert" role="alert">
          {state.message} Your details are still here. Try again, or reach me directly:{' '}
          <a href={`sms:${phone}`}>text {phonePretty}</a> or <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}

      <button type="submit" className="fx-btn fx-btn--p" disabled={state.kind === 'sending'}>
        {state.kind === 'sending' ? 'Sending…' : 'Request my free tech checkup'}
      </button>
    </form>
  );
}

export default CheckupForm;
