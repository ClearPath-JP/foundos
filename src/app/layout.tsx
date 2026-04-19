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
  title: "FoundOS — We build the system that runs your business",
  description:
    "Custom software, apps, and AI automations for local businesses. From $1,500. Live in 2 weeks.",
  openGraph: {
    title: "FoundOS",
    description:
      "We build the system that runs your business. Custom software, apps, and automations.",
    url: "https://foundos.ai",
    siteName: "FoundOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoundOS",
    description:
      "We build the system that runs your business. Custom software, apps, and automations.",
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
