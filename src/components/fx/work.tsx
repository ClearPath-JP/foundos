import Image from 'next/image';
import Link from 'next/link';

import type { WorkItem } from '@/config/work';

/** Opens the live build in a new tab. External, so a plain anchor. */
export function TryLink({ item, className, children }: { item: WorkItem; className: string; children: React.ReactNode }) {
  return (
    <a href={item.url} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="fx-sr"> (opens in a new tab)</span>
    </a>
  );
}

/** The phone and the desktop browser, overlapping. Decorative: the same content is linked as text. */
export function WorkVisual({ item }: { item: WorkItem }) {
  return (
    <div className="fx-work-vis" aria-hidden="true">
      <div className="fx-browser">
        <div className="fx-browser-bar">
          <span />
          <span />
          <span />
        </div>
        <Image src={item.images.desktop} alt="" width={1440} height={900} sizes="(min-width:960px) 560px, 90vw" />
      </div>
      <div className="fx-phone">
        <Image src={item.images.phone} alt="" width={390} height={844} sizes="200px" />
      </div>
    </div>
  );
}

/** The homepage band: one concept, what it shows, and two ways in. */
export function WorkFeature({ item }: { item: WorkItem }) {
  return (
    <div className="fx-split fx-work">
      <div>
        <p className="fx-kicker">See the work</p>
        <h2 className="fx-h2" id="work-h">
          A whole restaurant, made from scratch.
        </h2>
        <p className="fx-p">
          <strong className="fx-strong">{item.name}</strong> is a concept: a made-up taco spot I built to show the whole
          job, from the name and logo to the menu and a pickup order you can place yourself. Nothing is charged and no
          order is sent.
        </p>
        <div className="fx-btns">
          <TryLink item={item} className="fx-btn fx-btn--p fx-btn--lg">
            Try the ordering demo
          </TryLink>
          <Link href="/work" className="fx-btn fx-btn--s fx-btn--lg">
            How it was built
          </Link>
        </div>
      </div>
      <WorkVisual item={item} />
    </div>
  );
}
