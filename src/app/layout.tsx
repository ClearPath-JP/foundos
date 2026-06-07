import type { Metadata } from "next";
import { Inter, Geist_Mono, Caveat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "foundos.ai — AI automation for service businesses",
  description:
    "I help gym, studio, salon, and coaching owners automate their operations so their business runs on its own — and they get their time back.",
  openGraph: {
    title: "foundos.ai — AI automation for service businesses",
    description:
      "Audit your software, connect your tools, and deploy an AI agent that runs your business 24/7. Your revenue grows. Your hours shrink.",
    url: "https://foundos.ai",
    siteName: "foundos.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "foundos.ai — AI automation for service businesses",
    description:
      "I help service business owners automate their operations so their business runs on its own — and they get their time back.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
