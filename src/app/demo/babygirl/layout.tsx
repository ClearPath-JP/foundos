import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Babygirl — All Day Dining. Cafe. Restaurant. Bar.",
  description:
    "A calming neighborhood diner in East Lake, Atlanta. Coffee early, food all day, lights low when evening comes. From Chef Hudson Rouse.",
};

export default function BabygirlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
