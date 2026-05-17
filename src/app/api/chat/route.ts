import { streamText, type ModelMessage } from "ai";
import { createClient } from "@/lib/supabase/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { DEFAULT_MODEL_ID } from "@/lib/models";

export const maxDuration = 60;

const SYSTEM_BASE = `You are FoundOS — the architect agent. JP is your operator.

Your job:
1. Help JP think through strategy and decisions for the active project.
2. Flag gaps, risks, and missing context in plans. You are a reviewer, not a gatekeeper.
3. When JP signals a plan is ready, help him shape a Build Brief Package (overview, architecture, tasks, constraints, decisions, context) that Claude Code can execute from.

Style: direct, concise, opinionated. Avoid hedging. Reference the active project context the user includes in the conversation when relevant.`;

type ChatPayload = {
  messages: ModelMessage[];
  modelId?: string;
  projectName?: string | null;
  projectContext?: {
    brain?: string | null;
    activeContext?: string | null;
  } | null;
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data.user;
  if (!user || !isEmailAllowed(user.email)) {
    console.error("[chat] 401:", {
      hasUser: !!user,
      email: user?.email ?? null,
      allowed: user ? isEmailAllowed(user.email) : false,
      authError: error?.message ?? null,
    });
    return new Response("Unauthorized", { status: 401 });
  }

  const body = (await request.json()) as ChatPayload;
  const modelId = body.modelId ?? DEFAULT_MODEL_ID;

  const contextParts: string[] = [];
  if (body.projectName) {
    contextParts.push(`Active project: ${body.projectName}`);
  }
  if (body.projectContext?.activeContext) {
    contextParts.push(
      `--- ACTIVE CONTEXT ---\n${body.projectContext.activeContext}`
    );
  }
  if (body.projectContext?.brain) {
    contextParts.push(`--- BRAIN ---\n${body.projectContext.brain}`);
  }

  const system =
    contextParts.length > 0
      ? `${SYSTEM_BASE}\n\n${contextParts.join("\n\n")}`
      : SYSTEM_BASE;

  try {
    const result = streamText({
      model: modelId,
      system,
      messages: body.messages,
      onError({ error }) {
        console.error("[chat] stream error:", error);
      },
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[chat] threw:", err);
    return new Response(
      err instanceof Error ? err.message : "Chat failed.",
      { status: 500 }
    );
  }
}
