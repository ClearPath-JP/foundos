import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FX_FLAT_CSS } from '@/components/fx/flat-css';
import { FX_OFFER_CSS } from '@/components/fx/offer-css';
import { FX_PORTFOLIO_CSS } from '@/components/fx/portfolio-css';
import { FX_SYSTEMS_CSS } from '@/components/fx/systems-css';
import { LandingShell } from '@/components/landing/LandingShell';
import { ContactSection } from '@/components/landing/Services';
import { LiquidBackground } from '@/components/fx/LiquidBackground';
import { WORK } from '@/config/work';

const TITLE = 'Work | foundos';
const DESCRIPTION =
  'Concept restaurants built end to end by foundos: The Wandering Chile with online pickup ordering, and Cinder & Fig with table booking and a live staff screen you can try.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: './work', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

/** The portfolio at a glance: one card per project, each opening its own page. */
export default function WorkPage() {
  return (
    <LandingShell extraCss={FX_OFFER_CSS + FX_PORTFOLIO_CSS + FX_SYSTEMS_CSS + FX_FLAT_CSS}>
      <section className="fx-phead">
        <LiquidBackground />
        <div className="fx-wrap">
          <p className="fx-eyebrow">Work</p>
          <h1 className="fx-h1">See what you’d get before you pay for it.</h1>
          <p className="fx-lede">
            Each one is built end to end: the website, and the system the staff run it with. Real client work joins
            these once those restaurants agree to be shown. Until then, concepts are labelled as concepts.
          </p>
        </div>
      </section>

      <section className="fx-sec fx-sec--join fx-lsec" aria-labelledby="work-list-h">
        <LiquidBackground className="fx-liquid--bottom" />
        <div className="fx-wrap">
          <h2 className="fx-sr" id="work-list-h">
            Projects
          </h2>
          <ul className="fx-work-grid" role="list">
            {WORK.map((item) => {
              return (
                <li key={item.slug}>
                  <Link href={`/work/${item.slug}`} className="fx-wcard" aria-label={`${item.name}: ${item.type}. Read more`}>
                    <span className="fx-wcard-img">
                      <Image className="wc-desk" src={item.images.desktop} alt="" width={1440} height={900} sizes="(min-width:760px) 45vw, 1px" />
                      <Image className="wc-phone" src={item.images.phone} alt="" width={390} height={844} sizes="(max-width:759px) 92vw, 1px" />
                    </span>
                    <span className="fx-wcard-body">
                      <span className="fx-wcard-tags">
                        <span className="fx-wcard-tag">{item.kind === 'concept' ? 'Concept' : 'Client'}</span>
                      </span>
                      <span className="fx-wcard-name">{item.name}</span>
                      <span className="fx-wcard-type">{item.type}</span>
                      <span className="fx-wcard-sys">{item.systemLabel}</span>
                      <span className="fx-wcard-more">See the project</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 2026-10-11: the old close band quoted the retired Digital Care / Growth plans and a phone number. */}
      <ContactSection />
    </LandingShell>
  );
}
