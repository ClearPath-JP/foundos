import type { Metadata } from 'next';

import GrowthAudit from '@/components/audit/GrowthAudit';
import Shell from '@/components/fx/Shell';
import { LiquidBackground } from '@/components/fx/LiquidBackground';
import { CONTACT } from '@/config/offer';

/**
 * The Free Restaurant Growth Audit — added 2026-10-03 from the outside
 * "Growth Audit / Growth Score" plan (§1, §2, §13, §14). The scan reuses the
 * August instant-report engine; the score is lib/report/score.ts.
 */

const TITLE = 'Free digital audit for restaurants | foundos';
const DESCRIPTION =
  'See where your restaurant may be losing customers online. A free check of your website, Google listing, phone experience, ordering and follow-up.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: './audit', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

/**
 * What the scan and the hand check look for, in the words an owner would use. 2026-10-04: only what the scan can
 * actually detect is described as scanned; judgment calls (photo quality, whose food it is) are Josh's, by hand.
 */
const CHECKS = [
  { t: 'Buttons that don’t work', d: 'The scan taps the links on your homepage and flags an “Order” or “Menu” button that goes nowhere, or a link to a page that’s gone.' },
  { t: 'Photos', d: 'The scan counts the photos on your homepage and your Google listing. Whether they show your own food, and how they look, Josh judges by hand.' },
  { t: 'Menu as a PDF', d: 'A menu posted as a PDF or a picture means pinching and zooming on a phone, and it’s harder to update than a menu page.' },
  { t: 'Online ordering', d: 'Can customers order from you directly, or do your order links go to an app that charges a commission?' },
  { t: 'Google Business Profile', d: 'Hours, photos, takeout and your website link, set up and right where people search.' },
  { t: 'When it was last updated', d: 'An old year in your footer is a small detail first-time visitors notice. The scan reads it; it doesn’t prove anything about your restaurant.' },
  { t: 'Too much going on', d: 'A heavy page that’s slow on a phone and buries the menu and phone number.' },
  { t: 'Phone basics', d: 'Does it fit a phone screen, and can someone call you in one tap?' },
] as const;

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const q = (await searchParams).q;
  const initialQuery = (Array.isArray(q) ? q[0] : q ?? '').slice(0, 120);
  return (
    <Shell current="audit">
      <section className="fx-sec fx-lhead" style={{ paddingTop: 56 }}>
        <LiquidBackground />
        {/* Phone order: promise, then the form, then what's checked. Desktop: text left, form right. */}
        <div className="fx-wrap ga-layout">
          <div className="ga-intro">
            <p className="fx-eyebrow">Free digital audit</p>
            <h1 className="fx-h2" style={{ marginTop: 14 }}>
              See what a customer sees when they look you up.
            </h1>
            <p className="fx-p">
              Type your restaurant’s name. In about 15 seconds you get a plain-English list of what an automated
              check could see, like broken buttons, missing hours or a PDF menu, and what it couldn’t. Then ask for
              the full audit, and Josh goes through it by hand. It’s free, and there’s no obligation.
            </p>
          </div>
          <div className="ga-form">
            <GrowthAudit phone={CONTACT.phone} phonePretty={CONTACT.phonePretty} email={CONTACT.email} initialQuery={initialQuery} />
          </div>
          <div className="ga-checks">
            <p className="fx-kicker">What I look for</p>
            <ul className="fx-next" role="list">
              {CHECKS.map((c) => (
                <li key={c.t}>
                  <strong>{c.t}.</strong> {c.d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Shell>
  );
}
