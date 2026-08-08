/**
 * Telegram lead alerts.
 *
 * Anyone who runs a report is a lead — the business name alone is enough to look
 * them up and call them. Without this the report engine is a machine that helps
 * strangers for free and never tells JP it happened.
 *
 * Rules this file follows:
 *  - Silent no-op when the env vars are missing, so local dev and previews are unaffected.
 *  - Never throws. A failed alert must never cost a visitor their report.
 *  - Deduped per business, so a refresh or a sharpen pass doesn't buzz twice.
 */

const TIMEOUT_MS = 4000;
const DEDUPE_WINDOW_MS = 6 * 60 * 60 * 1000; // 6h

/**
 * Per-instance and best-effort only — same caveat as the caches in the report
 * route. Worst case is a duplicate ping, which is cheap.
 */
const notified = new Map<string, number>();

/** Telegram's HTML parse mode only reserves these three. */
function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export type LeadAlert = {
  name: string;
  address?: string | null;
  categoryLabel?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  /** From the Google listing — this is the number to actually call. */
  phone?: string | null;
  website?: string | null;
  /** Finding headlines, already ranked most-expensive-first. */
  findings?: string[];
  /** What the report told them it'd build — i.e. the opening offer. */
  builds?: string[];
  /** Stable key so refreshes don't re-alert. Falls back to the name. */
  dedupeKey?: string | null;
  /** True on the 3-tap path, where nothing was looked up. */
  fallback?: boolean;
};

function compose(lead: LeadAlert): string {
  const lines: string[] = [];

  lines.push(`🔔 <b>${esc(lead.name)}</b>`);

  const where = [lead.categoryLabel, lead.address].filter(Boolean).join(' · ');
  if (where) lines.push(esc(where));

  if (lead.rating != null) {
    const count = lead.reviewCount != null ? ` (${lead.reviewCount} reviews)` : '';
    lines.push(`⭐ ${lead.rating}${esc(count)}`);
  }

  if (lead.phone) lines.push(`📞 ${esc(lead.phone)}`);
  lines.push(lead.website ? `🌐 ${esc(lead.website)}` : '🌐 <i>no website found</i>');

  if (lead.findings?.length) {
    lines.push('');
    lines.push('<b>What it found</b>');
    for (const f of lead.findings.slice(0, 3)) lines.push(`• ${esc(f)}`);
  }

  if (lead.builds?.length) {
    lines.push('');
    lines.push(`<b>Pitch</b> — ${esc(lead.builds.slice(0, 2).join(' + '))}`);
  }

  if (lead.fallback) {
    lines.push('');
    lines.push('<i>Typed by hand — nothing was looked up. Verify before quoting.</i>');
  }

  return lines.join('\n');
}

/** Fire a lead alert. Resolves either way; never rejects. */
export async function notifyLead(lead: LeadAlert): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const name = lead.name?.trim();
  if (!name) return;

  const key = (lead.dedupeKey || name).toLowerCase();
  const now = Date.now();
  const last = notified.get(key);
  if (last && now - last < DEDUPE_WINDOW_MS) return;
  // Claim the window up front so two concurrent requests can't both send, then
  // release it if the send fails — otherwise one failure silently costs a lead
  // for six hours.
  notified.set(key, now);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: compose(lead),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      notified.delete(key);
      console.error('[notify] telegram responded', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    // A missed alert is a lost lead, not a broken page. Log, unclaim, move on.
    notified.delete(key);
    console.error('[notify] telegram failed:', err);
  }
}
