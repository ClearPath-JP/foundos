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
  title: "FoundOS — Custom websites, apps, and automations for local businesses",
  description:
    "I sit down with you, understand your business, and build exactly what you need. Custom websites, apps, and AI automations. Relationship first, tech second.",
  openGraph: {
    title: "FoundOS",
    description:
      "Custom websites, apps, and automations built around your business. Not a template. Not an agency. A builder in your corner.",
    url: "https://foundos.ai",
    siteName: "FoundOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoundOS",
    description:
      "Custom websites, apps, and automations built around your business. Relationship first, tech second.",
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
