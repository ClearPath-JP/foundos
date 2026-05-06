import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "FoundOS — Business Architecture for the AI Era | Atlanta",
  description:
    "I build the systems local businesses need — websites, AI agents, automation, and custom software. One architect. Direct communication. Atlanta, GA.",
  openGraph: {
    title: "FoundOS — Business Architecture for the AI Era",
    description:
      "Websites. AI agents. Custom software. I look at how your business runs and build the technology that fills the gaps.",
    url: "https://foundos.ai",
    siteName: "FoundOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoundOS — Business Architecture for the AI Era",
    description:
      "I build the systems local businesses need — websites, AI agents, automation, and custom software. One architect. Atlanta, GA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
