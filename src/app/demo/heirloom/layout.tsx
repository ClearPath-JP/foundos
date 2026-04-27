import type { Metadata } from "next";
import { Oswald, Lora } from "next/font/google";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heirloom Market BBQ — Southern BBQ x Korean Flavors | Atlanta, GA",
  description:
    "Slow cooked Southern BBQ combined with Korean marinades and spices. Michelin Bib Gourmand 2023-2025. James Beard Semi-Finalist. Atlanta's legendary BBQ.",
  openGraph: {
    title: "Heirloom Market BBQ",
    description:
      "Southern BBQ meets Korean soul. Michelin-recognized, chef-driven, Atlanta's cult favorite.",
    type: "website",
  },
};

export default function HeirloomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${oswald.variable} ${lora.variable}`}>{children}</div>
  );
}
