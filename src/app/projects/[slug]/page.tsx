import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CloseBand, contactFor, Faq, needsGrowth } from '@/components/fx/cards';
import Shell from '@/components/fx/Shell';
import { LiquidBackground } from '@/components/fx/LiquidBackground';
import { LIVE_PROJECTS, usd } from '@/config/offer';

import { PROJECT_DETAILS } from '../details';

/**
 * /projects/<slug> for each project that can be bought today. Same section
 * order as the plan pages (doc §6); ordering shows equipment costs before any
 * payment action.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return LIVE_PROJECTS.filter((p) => p.slug in PROJECT_DETAILS).map((p) => ({ slug: p.slug }));
}

function find(slug: string) {
  const project = LIVE_PROJECTS.find((p) => p.slug === slug);
  const detail = PROJECT_DETAILS[slug];
  return project && detail ? { project, detail } : null;
}

const priceText = (p: { price: number; from?: boolean }) => `${p.from ? 'from ' : ''}${usd(p.price)}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { project } = found;
  const title = `${project.name}, ${priceText(project)} | foundos`;
  return {
    title,
    description: project.pitch,
    openGraph: {
      title,
      description: project.pitch,
      url: `./projects/${project.slug}`,
      siteName: 'foundos',
      type: 'website',
      locale: 'en_US',
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { project, detail } = found;

  return (
    <Shell current="plans">
      <section className="fx-phead">
        <LiquidBackground />
        <div className="fx-wrap">
          <p className="fx-crumb">
            <Link href="/plans#projects">Pricing</Link> / {project.name}
          </p>
          <h1 className="fx-h1" style={{ marginTop: 14 }}>
            {project.name}
          </h1>
          <p className="fx-lede">{detail.outcome}</p>
        </div>
      </section>

      <div className="fx-wrap fx-detail">
        <aside className="fx-buy" aria-label={project.name}>
          <p className="fx-plan-name">{project.name}</p>
          <p className="fx-price">
            {project.from && <span className="fx-price-from">From</span>}
            <span className="fx-price-n">{usd(project.price)}</span>
            <span className="fx-price-u">{needsGrowth(project.slug) ? 'one time, plus the Growth plan' : 'one time'}</span>
          </p>
          <ul className="fx-buy-lines" role="list">
            {detail.buy.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <Link href={contactFor(project.slug)} className="fx-btn fx-btn--p fx-btn--lg">
            {project.cta}
          </Link>
          <p className="fx-note">You see the full price before you pay anything.</p>
        </aside>

        <div className="fx-detail-main">
          <div className="fx-block">
            <h2 className="fx-h3">What’s included</h2>
            <ul className="fx-checks" role="list">
              {detail.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">Not included</h2>
            <ul className="fx-x" role="list">
              {detail.excluded.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">How it goes</h2>
            <ol className="fx-steps fx-steps--list" role="list">
              {detail.process.map((s) => (
                <li key={s}>
                  <p className="fx-step-d">{s}</p>
                </li>
              ))}
            </ol>
            <p className="fx-p">{detail.timeline}</p>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">What you send me</h2>
            <ul className="fx-x" role="list">
              {detail.supply.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">Other costs</h2>
            <p className="fx-p">{detail.costs}</p>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">Payment</h2>
            <p className="fx-p">{detail.payment}</p>
          </div>

          <div className="fx-block">
            <h2 className="fx-h3">Questions</h2>
            <Faq items={detail.faq} />
          </div>
        </div>
      </div>

      <CloseBand
        title={project.slug === 'direct-ordering-launch' ? 'Start with a compatibility check' : 'Check if it fits'}
        body="Tell me what you use today. I’ll confirm it works and send the full scope and price before anything is paid."
      />
    </Shell>
  );
}
