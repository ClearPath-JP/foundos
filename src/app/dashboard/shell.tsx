"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  fetchProjects,
  pingBridge,
  type BridgeProject,
} from "@/lib/bridge/client";

type DashboardCtx = {
  projects: BridgeProject[];
  loadingProjects: boolean;
  bridgeOnline: boolean;
  activeProject: string | null;
  setActiveProject: (name: string | null) => void;
  refreshProjects: () => Promise<void>;
};

const Ctx = createContext<DashboardCtx | null>(null);

export function useDashboard() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDashboard must be inside DashboardShell");
  return v;
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<BridgeProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [bridgeOnline, setBridgeOnline] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  async function refreshProjects() {
    setLoadingProjects(true);
    const online = await pingBridge();
    setBridgeOnline(online);
    if (online) {
      try {
        const list = await fetchProjects();
        setProjects(list);
      } catch {
        setProjects([]);
      }
    } else {
      setProjects([]);
    }
    setLoadingProjects(false);
  }

  useEffect(() => {
    refreshProjects();
    const t = setInterval(() => {
      pingBridge().then(setBridgeOnline);
    }, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <Ctx.Provider
      value={{
        projects,
        loadingProjects,
        bridgeOnline,
        activeProject,
        setActiveProject,
        refreshProjects,
      }}
    >
      <div className="flex min-h-screen">
        <aside className="w-64 shrink-0 border-r border-neutral-900 bg-neutral-950 flex flex-col">
          <div className="px-4 py-4 border-b border-neutral-900">
            <div className="text-sm font-semibold tracking-tight">FoundOS</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">
              local command center
            </div>
          </div>

          <div className="px-3 py-3 border-b border-neutral-900">
            <BridgeStatus online={bridgeOnline} onRetry={refreshProjects} />
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <div className="px-4 pb-2 text-[11px] uppercase tracking-wider text-neutral-500">
              Projects
            </div>
            {loadingProjects ? (
              <div className="px-4 text-xs text-neutral-500">Loading…</div>
            ) : projects.length === 0 ? (
              <div className="px-4 text-xs text-neutral-500">
                {bridgeOnline
                  ? "No projects found in vault."
                  : "Start foundos-bridge to see projects."}
              </div>
            ) : (
              <ul className="space-y-px">
                {projects.map((p) => (
                  <li key={p.name}>
                    <button
                      onClick={() => setActiveProject(p.name)}
                      className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                        activeProject === p.name
                          ? "bg-neutral-800 text-neutral-50"
                          : "text-neutral-300 hover:bg-neutral-900"
                      }`}
                    >
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </Ctx.Provider>
  );
}

function BridgeStatus({
  online,
  onRetry,
}: {
  online: boolean;
  onRetry: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            online ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
        <span className="text-xs text-neutral-400">
          {online ? "Bridge online" : "Bridge offline"}
        </span>
      </div>
      <button
        onClick={onRetry}
        className="text-[11px] text-neutral-500 hover:text-neutral-200"
      >
        Refresh
      </button>
    </div>
  );
}
