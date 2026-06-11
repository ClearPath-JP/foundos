import Aurora from './explore/aurora/page';

/**
 * foundos.ai homepage.
 * The live homepage renders the "Aurora" design (Stripe-style soft liquid
 * gradient hero → clean white body). The component lives in
 * src/app/explore/aurora/page.tsx; this keeps a single source of truth.
 * SEO/social metadata comes from src/app/layout.tsx.
 */
export default function HomePage() {
  return <Aurora />;
}
