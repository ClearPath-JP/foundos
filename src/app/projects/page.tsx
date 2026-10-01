import type { Metadata } from 'next';

import { CloseBand, ProjectCards, RequestList } from '@/components/fx/cards';
import Shell from '@/components/fx/Shell';

const TITLE = 'One-time projects | foundos';
const DESCRIPTION =
  'Direct Ordering Launch from $1,500 and Social Profile Cleanup for $249. One-time projects for restaurants, no monthly plan required.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: './projects',
    siteName: 'foundos',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ProjectsPage() {
  return (
    <Shell current="projects">
      <section className="fx-phead">
        <div className="fx-wash" aria-hidden="true" />
        <div className="fx-wrap">
          <p className="fx-eyebrow">One-time projects</p>
          <h1 className="fx-h1">One job, one price, done.</h1>
          <p className="fx-lede">
            Paid once, with a clear scope. You don’t need a monthly plan to buy one, though a plan keeps things right
            afterwards.
          </p>
        </div>
      </section>

      <section className="fx-sec fx-sec--join" aria-label="Available now">
        <div className="fx-wrap">
          <ProjectCards />
        </div>
      </section>

      <section className="fx-sec fx-sec--tint" aria-labelledby="req-h">
        <div className="fx-wrap">
          <p className="fx-kicker">By request</p>
          <h2 className="fx-h2" id="req-h">
            Also available, scoped one restaurant at a time
          </h2>
          <p className="fx-p">
            These get a price after a short conversation about what you need, so the quote matches the job.
          </p>
          <RequestList />
        </div>
      </section>

      <CloseBand
        title="Not sure what you need?"
        body="Tell me what’s not working. I’ll point you to the one project that fixes it, or tell you it isn’t worth paying for."
      />
    </Shell>
  );
}
