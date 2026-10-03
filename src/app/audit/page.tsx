import type { Metadata } from 'next';

import GrowthAudit from '@/components/audit/GrowthAudit';
import Shell from '@/components/fx/Shell';
import { CONTACT } from '@/config/offer';

/**
 * The Free Restaurant Growth Audit — added 2026-10-03 from the outside
 * "Growth Audit / Growth Score" plan (§1, §2, §13, §14). The scan reuses the
 * August instant-report engine; the score is lib/report/score.ts.
 */

const TITLE = 'Free Restaurant Growth Audit | foundos';
const DESCRIPTION =
  'See where your restaurant may be losing customers online. A free check of your website, Google listing, phone experience, ordering and follow-up.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: './audit', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

const CHECKS = [
  { t: 'Website', d: 'Does it load, is it secure, and does it look looked-after?' },
  { t: 'Mobile', d: 'Can someone on a phone read the menu and call you in one tap?' },
  { t: 'Google', d: 'Are your hours, takeout and basics right where people search?' },
  { t: 'Local search', d: 'Can Google read your menu and know what you serve?' },
  { t: 'Ordering', d: 'Can customers order from you, or only through an app that takes a cut?' },
  { t: 'Follow-up', d: 'Does a catering inquiry or a first-time customer ever hear back?' },
] as const;

export default function AuditPage() {
  return (
    <Shell current="audit">
      <section className="fx-sec fx-sec--tint" style={{ paddingTop: 56 }}>
        <div className="fx-wrap fx-form-grid">
          <div>
            <p className="fx-eyebrow">Free Restaurant Growth Audit</p>
            <h1 className="fx-h2" style={{ marginTop: 14 }}>
              Find out where your restaurant is losing customers online.
            </h1>
            <p className="fx-p">
              Run the scan for your Growth Score in about 15 seconds. Then ask for the full audit, and Josh goes
              through it by hand and sends you what he’d fix first. It’s free, and there’s no obligation.
            </p>
            <ul className="fx-next" role="list">
              {CHECKS.map((c) => (
                <li key={c.t}>
                  <strong>{c.t}.</strong> {c.d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <GrowthAudit phone={CONTACT.phone} phonePretty={CONTACT.phonePretty} email={CONTACT.email} />
          </div>
        </div>
      </section>
    </Shell>
  );
}
