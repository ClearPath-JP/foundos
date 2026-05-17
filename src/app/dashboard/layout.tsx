import type { ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "./shell";

export const metadata = {
  title: "FoundOS — Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <DashboardShell userEmail={user?.email ?? null}>{children}</DashboardShell>
      <div className="hidden">
        <Link href="/">home</Link>
      </div>
    </div>
  );
}
