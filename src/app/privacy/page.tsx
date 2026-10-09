import type { Metadata } from 'next';
import Link from 'next/link';

import { AUDIT_EMAIL, INSTAGRAM } from '@/config/audit';
import { LandingShell } from '@/components/landing/LandingShell';

/**
 * Audit request privacy notice (2026-10-09), adapted from the launch pack's draft
 * (foundos-launch-pack/01-PRODUCT-PAGE-FORM.md) to what is actually running:
 *   - foundos.ai is hosted on Vercel (not Cloudflare Pages as the draft assumed).
 *   - The request form is Tally. Owner email alerts go to the Tally account owner.
 *   - Audits are delivered by email (Josh's Google Workspace inbox) AND Instagram DM, as a short Loom video or PDF
 *     (v2 offer, 2026-10-09). Owner alerts reach Josh's Gmail. The instant AI first look was removed the same day.
 *   - No analytics, no tracking pixel, no newsletter, no Google Sheet sync (not enabled).
 * Manychat added 2026-10-09 for the Instagram DM automation. List only providers that are actually running.
 * ⚠️ The 90-day cleanup is a promise: it only stays true if Josh actually does the monthly cleanup.
 *
 * The previous policy (instant report, phone capture, Telegram) is in git at 918db3a.
 */

export const metadata: Metadata = {
  title: 'Privacy notice | FoundOS',
  description: 'How FoundOS handles the information you share when you request a free 3-point digital growth audit.',
};

const EFFECTIVE = 'October 9, 2026';

const PROVIDERS = [
  { name: 'Tally', role: 'the request form and its stored responses', href: 'https://tally.so/help/privacy-policy' },
  { name: 'Vercel', role: 'hosting for this website', href: 'https://vercel.com/legal/privacy-policy' },
  { name: 'Google Workspace and Gmail', role: 'the email I use to receive requests and send your audit', href: 'https://policies.google.com/privacy' },
  { name: 'Instagram (Meta)', role: 'our DM conversation and delivery of your audit there', href: 'https://privacycenter.instagram.com/policy' },
  { name: 'Loom', role: 'when your audit is sent as a video', href: 'https://www.atlassian.com/legal/privacy-policy' },
  {
    name: 'Manychat',
    role: 'sends automatic Instagram replies and helps me manage audit-related DM conversations, including your Instagram username and messages',
    href: 'https://manychat.com/legal/privacy-14082026',
  },
] as const;

export default function PrivacyPage() {
  return (
    <LandingShell>
      <section className="lp-sec" style={{ borderTop: 0 }} aria-labelledby="privacy-h">
        <div className="fx-wrap lp-form-wrap">
          <h1 className="lp-h2" id="privacy-h">
            FoundOS audit request privacy notice
          </h1>
          <p className="fx-p">Effective {EFFECTIVE}</p>

          <p className="fx-p">
            FoundOS, run by Josh, collects the details you submit to prepare and deliver your requested digital growth
            audit. This can include your name, email, business name, public page links or handles, service category,
            the Instagram username you message me from, and the context you choose to share.
          </p>

          <h2 className="lp-row-t" style={{ marginTop: 40 }}>
            How I use it
          </h2>
          <p className="fx-p">
            I personally review your public business presence and send your audit, a short Loom video or PDF, to the
            email address and Instagram account you provide. I may contact you there with questions needed to complete
            it. I also use your Instagram username to match your request to our Instagram conversation, and I track
            whether requests were completed. Submitting an audit request does not subscribe you to marketing emails.
          </p>

          <h2 className="lp-row-t" style={{ marginTop: 40 }}>
            Services involved
          </h2>
          <ul className="fx-p" style={{ paddingLeft: 20 }}>
            {PROVIDERS.map((p) => (
              <li key={p.name} style={{ marginTop: 8 }}>
                <a href={p.href} target="_blank" rel="noopener">
                  {p.name}
                </a>{' '}
                — {p.role}.
              </li>
            ))}
          </ul>
          <p className="fx-p">
            These providers process information under their own terms and privacy policies, and processing locations
            can vary. This site uses no analytics or advertising trackers.
          </p>

          <h2 className="lp-row-t" style={{ marginTop: 40 }}>
            Campaign links
          </h2>
          <p className="fx-p">
            Links I share may record a source, such as Instagram or a particular Reel. Please don’t include customer
            information, login details, or sensitive personal information in your request. I do not sell the
            information you provide for this audit.
          </p>

          <h2 className="lp-row-t" style={{ marginTop: 40 }}>
            How long I keep it
          </h2>
          <p className="fx-p">
            I review audit records monthly and delete closed requests, including audit videos and files I created,
            after 90 days, unless we are still in an ongoing conversation. Messages already delivered to your inbox or
            Instagram stay with you, and copies in the providers’ backups follow their own retention schedules.
          </p>

          <h2 className="lp-row-t" style={{ marginTop: 40 }}>
            Questions or removal
          </h2>
          <p className="fx-p">
            To ask a question or have your audit information removed, email{' '}
            <a href={`mailto:${AUDIT_EMAIL}`}>{AUDIT_EMAIL}</a> or message{' '}
            <a href={INSTAGRAM.url} target="_blank" rel="noopener">
              @{INSTAGRAM.handle}
            </a>
            .
          </p>

          <p className="fx-p" style={{ marginTop: 48 }}>
            <Link href="/#request">Back to the free audit</Link>
          </p>
        </div>
      </section>
    </LandingShell>
  );
}
