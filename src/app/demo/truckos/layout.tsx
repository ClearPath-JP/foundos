import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Truck OS / Counter OS — live demo | foundos.ai",
  description:
    "A working demo of the ordering, sold-out and text-list system for food trucks and bakeries. Flip between what the customer sees and what the owner sees.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Truck OS — live demo",
    description:
      "Live location, order-ahead pickup, one-tap sold-out, and a text list the business owns.",
    type: "website",
  },
};

export default function TruckOsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#0f0b0a]">{children}</div>;
}
