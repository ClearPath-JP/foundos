import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CloseBand } from '@/components/fx/cards';
import Shell from '@/components/fx/Shell';
import { LiquidBackground } from '@/components/fx/LiquidBackground';
import { TryLink, WorkVisual } from '@/components/fx/work';
import { WORK } from '@/config/work';

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return {};
  const title = `${item.name} | Work | foundos`;
  const description = `${item.summary} ${item.kind === 'concept' ? 'A concept build, labelled as one.' : ''}`.trim();
  return {
    title,
    description,
    openGraph: { title, description, url: `./work/${item.slug}`, siteName: 'foundos', type: 'website', locale: 'en_US' },
  };
}

/** One project, in full: what it is, what was made, and how to try it. */
export default async function WorkItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = WORK.find((w) => w.slug === slug);
  if (!item) notFound();

  return (
    <Shell current="work">
      <article aria-labelledby="w-title">
        <section className="fx-phead">
          <LiquidBackground />
          <div className="fx-wrap fx-split">
            <div>
              <Link href="/work" className="fx-back">
                All work
              </Link>
              <span className="fx-badge">{item.kind === 'concept' ? 'Concept build' : 'Client'}</span>
              <h1 className="fx-h1" id="w-title">
                {item.name}
              </h1>
              <p className="fx-plan-for" style={{ marginTop: 8 }}>
                {item.type}
              </p>
              <p className="fx-p">{item.summary}</p>
              <div className="fx-btns">
                <TryLink item={item} className="fx-btn fx-btn--p fx-btn--lg">
                  Open the live site
                </TryLink>
                {item.staff && (
                  <a href={item.staff.url} className="fx-btn fx-btn--s fx-btn--lg" target="_blank" rel="noopener noreferrer">
                    {item.staff.label}
                    <span className="fx-sr"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
              {item.kind === 'concept' && (
                <p className="fx-note">
                  {item.note}
                  {item.staff && ` ${item.staff.how}`}
                </p>
              )}
            </div>
            <WorkVisual item={item} />
          </div>
        </section>

        <section className="fx-sec" aria-labelledby="process-h">
          <div className="fx-wrap">
            <p className="fx-kicker">How I built it</p>
            <h2 className="fx-h2" id="process-h">
              The same steps your restaurant would go through.
            </h2>
            <ol className="fx-steps wk-process" role="list">
              {item.process.map((s) => (
                <li key={s.t}>
                  <p className="fx-step-t">{s.t}</p>
                  <p className="fx-step-d">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="fx-sec fx-sec--tint" aria-labelledby="made-h">
          <div className="fx-wrap">
            <p className="fx-kicker">What I made</p>
            <h2 className="fx-h2" id="made-h">
              Not just a website.
            </h2>
            <ul className="fx-handles" role="list">
              {item.made.map((m) => (
                <li key={m.t} className="fx-help-item">
                  <p className="fx-help-t">{m.t}</p>
                  <p className="fx-help-d">{m.d}</p>
                </li>
              ))}
            </ul>
            <figure className="fx-shot">
              <Image src={item.images.detail} alt={item.detailAlt} width={1440} height={900} sizes="(min-width:1120px) 1040px, 92vw" />
              <figcaption>{item.detailCaption}</figcaption>
            </figure>
          </div>
        </section>

        <section className="fx-sec fx-lsec" aria-labelledby="try-h">
          <LiquidBackground className="fx-liquid--bottom" />
          <div className="fx-wrap fx-split fx-split--top">
            <div>
              <p className="fx-kicker">Try it yourself</p>
              <h2 className="fx-h2" id="try-h">
                {item.tryTitle}
              </h2>
            </div>
            <div>
              <ol className="fx-steps fx-steps--list" role="list">
                {item.tryIt.map((t) => (
                  <li key={t}>
                    <p className="fx-step-d">{t}</p>
                  </li>
                ))}
              </ol>
              <div className="fx-btns">
                <TryLink item={item} className="fx-btn fx-btn--p fx-btn--lg">
                  {item.tryCta}
                </TryLink>
                {item.staff ? (
                  <Link href="/restaurant-systems" className="fx-btn fx-btn--s fx-btn--lg">
                    How the system works
                  </Link>
                ) : (
                  <Link href="/work" className="fx-btn fx-btn--s fx-btn--lg">
                    See other work
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </article>

      <CloseBand
        title="Want this for your restaurant?"
        body="Built the same way, with your real name, menu and photos. A website alone is Digital Care. Booking, follow-up or other systems are Growth, and online ordering adds a one-time setup. Logo work is quoted separately."
      />
    </Shell>
  );
}
