import type { NextConfig } from "next";

/**
 * Pages removed 2026-10-01: nine pre-rebuild pages (old design, the food-truck
 * offer, old prices like $1,250 and $97/mo) that nothing linked to but Google
 * could still index. Each old URL lands on the current page that covers the same
 * ground. See DECISIONS.md, "Old pages removed". The files are in git history.
 */
const REMOVED_PAGES: { source: string; destination: string }[] = [
  { source: "/pricing", destination: "/plans" },
  { source: "/systems", destination: "/projects" },
  { source: "/why", destination: "/how-it-works" },
  { source: "/questions", destination: "/how-it-works" },
  { source: "/restaurant-websites", destination: "/plans" },
  { source: "/google-business-profile", destination: "/plans/digital-care" },
  { source: "/online-ordering", destination: "/projects/direct-ordering-launch" },
  { source: "/ai-phone-answering", destination: "/projects" },
  { source: "/food-truck-location", destination: "/projects" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return REMOVED_PAGES.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
