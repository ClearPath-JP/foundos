import type { Metadata } from "next";
import { Inter, Geist_Mono, Caveat, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

// Crafted display face for headlines on the dark "velvet" homepage —
// gives the hand-made, editorial feel (escapes the default-Inter SaaS look).
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "foundos.ai — see exactly what I'd build for your business";
const DESC =
  "Type your business name and get a free report on what's costing you customers right now — pulled from your Google listing and your own site. Websites, online ordering, booking, and an AI receptionist for local businesses in Atlanta.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://foundos.ai",
    siteName: "foundos.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${caveat.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
