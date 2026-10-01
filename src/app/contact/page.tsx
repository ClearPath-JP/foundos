import type { Metadata } from 'next';

import InquiryForm from '@/components/contact/InquiryForm';
import Shell from '@/components/fx/Shell';
import { CONTACT, interestLabel } from '@/config/offer';

const TITLE = 'Contact | foundos';
const DESCRIPTION = 'Tell Josh about your restaurant. Every message is read personally, and nothing is billed before you sign.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: './contact', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

/**
 * Where every plan and project button lands, with ?interest=<slug>. Unknown or
 * missing values fall back to "Not sure yet", so a hand-typed URL can't put
 * anything into the form that the API would reject.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = (await searchParams).interest;
  const wanted = typeof raw === 'string' ? raw : '';
  const interest = interestLabel(wanted) ? wanted : 'not-sure';
  const picked = interest !== 'not-sure' ? interestLabel(interest) : null;

  return (
    <Shell current="contact">
      <section className="fx-sec fx-sec--tint" style={{ paddingTop: 56 }}>
        <div className="fx-wrap fx-form-grid">
          <div>
            <p className="fx-eyebrow">Contact</p>
            <h1 className="fx-h2" style={{ marginTop: 14 }}>
              {picked ? `Let’s talk about ${picked}.` : 'Tell me about your restaurant.'}
            </h1>
            <p className="fx-p">
              I’ll read it myself, confirm what fits, and send the scope and price in writing. Nothing is billed until
              we’ve talked and you’ve signed.
            </p>
            <ul className="fx-next" role="list">
              <li>A reply within one business day.</li>
              <li>A straight answer if it isn’t a fit.</li>
              <li>No payment from this form.</li>
            </ul>
            <p className="fx-p">
              Rather text? <a href={`sms:${CONTACT.phone}`}>{CONTACT.phonePretty}</a>
              <br />
              Or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>
          <div className="fx-panel">
            <InquiryForm
              key={interest}
              email={CONTACT.email}
              phone={CONTACT.phone}
              phonePretty={CONTACT.phonePretty}
              interest={interest}
            />
          </div>
        </div>
      </section>
    </Shell>
  );
}
