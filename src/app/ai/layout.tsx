import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How AI Works for Your Business | FoundOS",
  description:
    "Not the hype. Not the fear. Just what AI does for your business, how it helps, and why it matters right now.",
  openGraph: {
    title: "How AI Works for Your Business | FoundOS",
    description:
      "AI answers your phone, follows up with leads, and runs your operations. Here's exactly how it works.",
  },
};

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
