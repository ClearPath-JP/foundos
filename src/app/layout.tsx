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
  title: "FoundOS — Custom Websites + Photography for Restaurants | Atlanta",
  description:
    "Custom websites and professional photography for restaurants, cafes, and bars in Atlanta. Starting at $2,000. No templates. No agencies. Just great work.",
  openGraph: {
    title: "FoundOS — Websites That Fill Tables",
    description:
      "Custom websites and professional photography for restaurants, cafes, and bars. Built from scratch. Starting at $2,000.",
    url: "https://foundos.ai",
    siteName: "FoundOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoundOS — Websites That Fill Tables",
    description:
      "Custom websites and professional photography for restaurants, cafes, and bars in Atlanta. Starting at $2,000.",
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
