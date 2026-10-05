import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

/**
 * Pages removed 2026-10-01: nine pre-rebuild pages (old design, the food-truck
 * offer, old prices like $1,250 and $97/mo) that nothing linked to but Google
 * could still index. Each old URL lands on the current page that covers the same
 * ground. See DECISIONS.md, "Old pages removed". The files are in git history.
 */
const REMOVED_PAGES: { source: string; destination: string }[] = [
  { source: "/pricing", destination: "/plans" },
  { source: "/systems", destination: "/restaurant-systems" },
  { source: "/why", destination: "/plans#how-it-works" },
  { source: "/questions", destination: "/plans#faq" },
  { source: "/restaurant-websites", destination: "/plans" },
  { source: "/google-business-profile", destination: "/plans/digital-care" },
  { source: "/online-ordering", destination: "/projects/direct-ordering-launch" },
  { source: "/ai-phone-answering", destination: "/plans#projects" },
  { source: "/food-truck-location", destination: "/plans#projects" },
  // 2026-10-03: pricing consolidated onto /plans; /projects and /how-it-works are sections of it now.
  { source: "/projects", destination: "/plans#projects" },
  { source: "/how-it-works", destination: "/plans#how-it-works" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return REMOVED_PAGES.map((r) => ({ ...r, permanent: true }));
  },
};

/** withBotId adds the proxy rewrites Vercel BotID needs (see src/instrumentation-client.ts). */
export default withBotId(nextConfig);
