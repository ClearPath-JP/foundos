import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Amistad Coffee Co. — Latin-Inspired Specialty Coffee | Midtown Atlanta",
  description:
    "Coffee + Conchas in the heart of Midtown Atlanta. Horchata lattes, elote lattes, mazapan lattes, and fresh pan dulce. Café con Amistad.",
  keywords: [
    "latin coffee shop atlanta",
    "specialty coffee midtown atlanta",
    "horchata latte atlanta",
    "elote latte atlanta",
    "mazapan latte atlanta",
    "conchas atlanta",
    "mexican coffee atlanta",
    "coffee shop near arts center atlanta",
  ],
  openGraph: {
    title: "Amistad Coffee Co. — Café con Amistad",
    description:
      "Latin-inspired specialty coffee + conchas in Midtown Atlanta. Horchata, Elote, and Mazapan lattes made with love.",
    type: "website",
  },
};

export default function AmistadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${jakarta.variable} ${dmSerif.variable}`}>{children}</div>
  );
}
