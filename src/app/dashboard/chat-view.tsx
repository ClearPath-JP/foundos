"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDashboard } from "./shell";
import {
  fetchProjectContext,
  type ProjectContext,
} from "@/lib/bridge/client";
import { DEFAULT_MODEL_ID, MODELS } from "@/lib/models";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ChatView() {
  const { activeProject, bridgeOnline } = useDashboard();
  const [modelId, setModelId] = useState<string>(DEFAULT_MODEL_ID);
  const [context, setContext] = useState<ProjectContext | null>(null);
  const [contextStatus, setContextStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeProject) {
      setContext(null);
      setContextStatus("idle");
      return;
    }
    if (!bridgeOnline) {
      setContextStatus("error");
      return;
    }
    setContextStatus("loading");
    fetchProjectContext(activeProject)
      .then((ctx) => {
        setContext(ctx);
        setContextStatus("ready");
      })
      .catch(() => setContextStatus("error"));
  }, [activeProject, bridgeOnline]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const contextSummary = useMemo(() => {
    if (!activeProject) return "No project selected — chat is context-free.";
    if (contextStatus === "loading") return "Loading project context…";
    if (contextStatus === "error") return "Failed to load project context.";
    if (!context) return "No context yet.";
    const bits: string[] = [];
    if (context.activeContext)
      bits.push(`active-context (${context.activeContext.length} chars)`);
    if (context.brain) bits.push(`brain (${context.brain.length} chars)`);
    if (bits.length === 0) return "Project found but no context files.";
    return `Loaded: ${bits.join(", ")}`;
  }, [activeProject, contextStatus, context]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || streaming) return;
    const userMsg: ChatMessage = {
      id: `${Date.now()}-u`,
      role: "user",
      content: trimmed,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setError(null);
    setStreaming(true);

    const assistantId = `${Date.now()}-a`;
    setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId,
          projectName: activeProject,
          projectContext: context,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok || !res.body) {
        throw new Error(`Chat API ${res.status}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) =>
          m.map((msg) => (msg.id === assistantId ? { ...msg, content: acc } : msg))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Stream failed.");
    } finally {
      setStreaming(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-neutral-900 px-6 py-3 flex items-center justify-between bg-neutral-950">
        <div>
          <div className="text-sm font-medium">
            {activeProject ?? "No project"}
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">
            {contextSummary}
          </div>
        </div>
        <select
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md text-xs px-2 py-1.5 text-neutral-200"
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center text-neutral-500 text-sm mt-20">
            <p className="text-neutral-300 text-base mb-2">
              The brain of your business.
            </p>
            <p>
              Pick a project on the left. Ask the architect what to do next.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((m) => (
              <div key={m.id} className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-neutral-500">
                  {m.role === "user" ? "You" : "Architect"}
                </div>
                <div className="whitespace-pre-wrap text-sm text-neutral-100 leading-relaxed">
                  {m.content || (
                    <span className="text-neutral-600">…</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {error ? (
        <div className="px-6 py-2 text-xs text-red-400 border-t border-neutral-900">
          {error}
        </div>
      ) : null}

      <div className="border-t border-neutral-900 px-6 py-4 bg-neutral-950">
        <div className="max-w-3xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              activeProject
                ? `Ask the architect about ${activeProject}…`
                : "Ask anything…"
            }
            rows={2}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-100 placeholder-neutral-600 focus:border-neutral-600 focus:outline-none resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="text-[11px] text-neutral-600">
              ⏎ to send · Shift+⏎ for newline
            </div>
            <button
              onClick={send}
              disabled={streaming || input.trim().length === 0}
              className="rounded-md bg-neutral-100 text-neutral-900 text-xs font-medium px-3 py-1.5 hover:bg-white disabled:opacity-50"
            >
              {streaming ? "Streaming…" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
