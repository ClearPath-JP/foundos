const BRIDGE_URL =
  process.env.NEXT_PUBLIC_BRIDGE_URL ?? "http://localhost:54321";
const BRIDGE_TOKEN = process.env.NEXT_PUBLIC_BRIDGE_TOKEN ?? "";

export type BridgeProject = {
  name: string;
  hasBrain: boolean;
  hasActiveContext: boolean;
};

export type ProjectContext = {
  project: string;
  brain: string | null;
  activeContext: string | null;
};

async function bridgeFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BRIDGE_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${BRIDGE_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Bridge ${path} ${res.status}: ${body || res.statusText}`);
  }
  return res;
}

export async function fetchProjects(): Promise<BridgeProject[]> {
  const res = await bridgeFetch("/projects");
  const data = (await res.json()) as { projects: BridgeProject[] };
  return data.projects;
}

export async function fetchProjectContext(
  name: string
): Promise<ProjectContext> {
  const res = await bridgeFetch(
    `/project/${encodeURIComponent(name)}/context`
  );
  return (await res.json()) as ProjectContext;
}

export async function writeBrief(payload: {
  project: string;
  slug: string;
  files: Record<string, string>;
}): Promise<{ path: string }> {
  const res = await bridgeFetch("/briefs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return (await res.json()) as { path: string };
}

export async function pingBridge(): Promise<boolean> {
  try {
    const res = await fetch(`${BRIDGE_URL}/health`, {
      headers: { Authorization: `Bearer ${BRIDGE_TOKEN}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}
