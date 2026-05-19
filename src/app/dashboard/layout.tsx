import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DashboardShell } from "./shell";

export const metadata = {
  title: "FoundOS — Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (process.env.VERCEL) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <DashboardShell>{children}</DashboardShell>
      <div className="hidden">
        <Link href="/">home</Link>
      </div>
    </div>
  );
}
