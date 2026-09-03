import type { Metadata } from "next";

const TITLE = "Truck OS — the website, text list and sold-out screen for food trucks";
const DESC =
  "Your regulars can't buy from you if they can't find you. A live location page, a text list you own, and one-tap sold out — built for a business that moves. $500 setup + $149/mo.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: "Truck OS — foundos.ai",
    description: DESC,
    url: "https://foundos.ai/truck",
    siteName: "foundos.ai",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

export default function TruckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#0f0b0a]">{children}</div>;
}
