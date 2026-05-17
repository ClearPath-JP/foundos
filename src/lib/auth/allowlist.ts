const RAW = process.env.FOUNDOS_ALLOWED_EMAILS ?? "";

const ALLOWED = new Set(
  RAW.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
);

export function isEmailAllowed(email: string | null | undefined): boolean {
  if (!email) return false;
  if (ALLOWED.size === 0) return false;
  return ALLOWED.has(email.toLowerCase());
}
