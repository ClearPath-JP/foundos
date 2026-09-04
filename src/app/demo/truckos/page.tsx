import type { Metadata } from "next";

import type { BusinessKey } from "./data";
import { Shell } from "./shell";
import { StoreProvider, type View } from "./store";

type Search = Promise<{ [key: string]: string | string[] | undefined }>;

/**
 * One route, two businesses. `?biz=bakery` is a real, linkable state — it is
 * printed in sales material and it is what the homepage's "Bakery" card points
 * at — so it has to be resolved on the SERVER, not in a mount effect.
 *
 * Before this, both links rendered identical server HTML (the food truck) under
 * one shared title, and only corrected themselves after hydration. The tab
 * label, the link preview a prospect sees when the URL is pasted into a text,
 * and the no-JS render all said "food truck" for the bakery demo.
 *
 * Read once here, used by both `generateMetadata` and the page body so the
 * title and the markup can never disagree.
 */
function readBiz(raw: string | string[] | undefined): BusinessKey {
  return raw === "bakery" ? "bakery" : "truck";
}

function readView(raw: string | string[] | undefined): View {
  return raw === "staff" ? "staff" : "customer";
}

/** Per-business head copy. Keyed by BusinessKey so a third business can't be
 *  forgotten here — TypeScript will ask for it. */
const HEAD: Record<
  BusinessKey,
  { title: string; description: string; ogTitle: string; ogDescription: string }
> = {
  truck: {
    title: "Truck OS — live food truck demo | foundos.ai",
    description:
      "A working demo of the ordering, sold-out and text-list system for a food truck. Flip between what the customer sees and what the owner sees.",
    ogTitle: "Truck OS — live food truck demo",
    ogDescription:
      "Live location, order-ahead pickup, one-tap sold-out, and a text list the business owns.",
  },
  bakery: {
    title: "Counter OS — live bakery demo | foundos.ai",
    description:
      "A working demo of the pre-order, sold-out and text-list system for a bakery. Flip between what the customer sees and what the owner sees.",
    ogTitle: "Counter OS — live bakery demo",
    ogDescription:
      "Pre-orders with a deposit, weekly items, one-tap sold-out, and a text list the business owns.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Search;
}): Promise<Metadata> {
  const head = HEAD[readBiz((await searchParams).biz)];

  return {
    title: head.title,
    description: head.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: head.ogTitle,
      description: head.ogDescription,
      type: "website",
    },
  };
}

export default async function TruckOsDemoPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const params = await searchParams;
  const business = readBiz(params.biz);
  const view = readView(params.view);

  return (
    /**
     * `key` matters. On a client-side <Link> hop between ?biz=truck and
     * ?biz=bakery this is the same component in the same slot, so React would
     * keep the old provider and its useState seeds — the title would change and
     * the screen would not. Keying on the business remounts the store.
     *
     * The in-demo "Food truck / Bakery" toggle does NOT touch the URL, so it
     * never trips this: it stays plain client state, and a prospect's cart and
     * order queue survive the switch.
     */
    <StoreProvider key={business} initialBusiness={business} initialView={view}>
      <Shell />
    </StoreProvider>
  );
}
