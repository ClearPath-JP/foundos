export type ModelChoice = {
  id: string;
  label: string;
  tier: "fast" | "smart" | "search" | "frontier";
  description: string;
};

export const MODELS: ModelChoice[] = [
  {
    id: "anthropic/claude-sonnet-4-5",
    label: "Claude Sonnet 4.5",
    tier: "smart",
    description: "Default. Best $/quality for strategy and reasoning.",
  },
  {
    id: "anthropic/claude-opus-4-5",
    label: "Claude Opus 4.5",
    tier: "frontier",
    description: "Escalate here for hard reasoning only. Most expensive.",
  },
  {
    id: "anthropic/claude-haiku-4-5",
    label: "Claude Haiku 4.5",
    tier: "fast",
    description: "Cheap and fast. Use for formatting, summaries, brief drafts.",
  },
  {
    id: "openai/gpt-5",
    label: "GPT-5",
    tier: "smart",
    description: "General-purpose alternative voice. Image generation upstream.",
  },
  {
    id: "perplexity/sonar",
    label: "Perplexity Sonar",
    tier: "search",
    description: "Real-time web research with citations.",
  },
  {
    id: "xai/grok-4",
    label: "Grok 4",
    tier: "smart",
    description: "Native X/Twitter context. Sentiment.",
  },
];

export const DEFAULT_MODEL_ID = MODELS[0].id;
