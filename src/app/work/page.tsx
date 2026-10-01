import type { Metadata } from 'next';
import Image from 'next/image';

import { CloseBand } from '@/components/fx/cards';
import Shell from '@/components/fx/Shell';
import { TryLink, WorkVisual } from '@/components/fx/work';
import { WORK } from '@/config/work';

const TITLE = 'Work | foundos';
const DESCRIPTION =
  'The Wandering Chile: a concept restaurant built from scratch by foundos, with a name, logo, menu and online pickup ordering you can try.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: './work', siteName: 'foundos', type: 'website', locale: 'en_US' },
};

export default function WorkPage() {
  return (
    <Shell current="work">
      <section className="fx-phead">
        <div className="fx-wash" aria-hidden="true" />
        <div className="fx-wrap">
          <p className="fx-eyebrow">Work</p>
          <h1 className="fx-h1">See what you’d get before you pay for it.</h1>
          <p className="fx-lede">
            Real client work goes here once those restaurants have agreed to be shown. Until then, this is a concept
            built end to end, and labelled as one.
          </p>
        </div>
      </section>

      {WORK.map((item) => (
        <article key={item.slug} aria-labelledby={`w-${item.slug}`}>
          <section className="fx-sec fx-sec--join">
            <div className="fx-wrap fx-split">
              <div>
                <span className="fx-badge">{item.kind === 'concept' ? 'Concept build' : 'Client'}</span>
                <h2 className="fx-h2" id={`w-${item.slug}`}>
                  {item.name}
                </h2>
                <p className="fx-plan-for" style={{ marginTop: 8 }}>
                  {item.type}
                </p>
                <p className="fx-p">{item.summary}</p>
                <div className="fx-btns">
                  <TryLink item={item} className="fx-btn fx-btn--p fx-btn--lg">
                    Open the live site
                  </TryLink>
                </div>
                {item.kind === 'concept' && (
                  <p className="fx-note">
                    The restaurant, address, hours and menu are made up. Ordering is a working demo: nothing is charged
                    and no order is sent.
                  </p>
                )}
              </div>
              <WorkVisual item={item} />
            </div>
          </section>

          <section className="fx-sec fx-sec--tint" aria-label={`What was made for ${item.name}`}>
            <div className="fx-wrap">
              <p className="fx-kicker">What I made</p>
              <h3 className="fx-h2">Not just a website.</h3>
              <ul className="fx-handles" role="list">
                {item.made.map((m) => (
                  <li key={m.t} className="fx-help-item">
                    <p className="fx-help-t">{m.t}</p>
                    <p className="fx-help-d">{m.d}</p>
                  </li>
                ))}
              </ul>
              <figure className="fx-shot">
                <Image
                  src={item.images.detail}
                  alt={`${item.name} menu: meal deals with prices and Add to Order buttons, then the taco section.`}
                  width={1440}
                  height={900}
                  sizes="(min-width:1120px) 1040px, 92vw"
                />
                <figcaption>The meal deals and menu, each item one tap from the cart.</figcaption>
              </figure>
            </div>
          </section>

          <section className="fx-sec" aria-label="Try it yourself">
            <div className="fx-wrap fx-split fx-split--top">
              <div>
                <p className="fx-kicker">Try it yourself</p>
                <h3 className="fx-h2">Place an order. It takes a minute.</h3>
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
                    Try the ordering demo
                  </TryLink>
                </div>
              </div>
            </div>
          </section>
        </article>
      ))}

      <CloseBand
        title="Want this for your restaurant?"
        body="Built the same way, with your real name, menu and photos. The website comes with either monthly plan. Online ordering is its own project on a supported ordering system, and logo work is quoted separately."
      />
    </Shell>
  );
}
