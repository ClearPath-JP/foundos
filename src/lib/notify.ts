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
  /**
   * The BUSINESS's number, off the Google listing. Nobody typed it in.
   *
   * ⚠️ Not the same thing as `capturedPhone` below, and the two must never be
   * conflated in the message. One is a number we looked up; the other is a
   * number a human chose to hand over. Mixing them up means Josh rings the
   * hostess stand instead of the owner who just raised his hand.
   */
  phone?: string | null;
  /**
   * The VISITOR's number, typed into the capture form under the report.
   * Only ever set on the /api/lead path. Its presence is the entire signal:
   * this is a person, not another page view.
   */
  capturedPhone?: string | null;
  website?: string | null;
  /** Finding headlines, already ranked most-expensive-first. */
  findings?: string[];
  /** What the report told them it'd build — i.e. the opening offer. */
  builds?: string[];
  /** Stable key so refreshes don't re-alert. Falls back to the name. */
  dedupeKey?: string | null;
  /** True on the 3-tap path, where nothing was looked up. */
  fallback?: boolean;
  /**
   * Things that degraded on the server while handling this one alert — the
   * Supabase insert was skipped, the n8n webhook is dead. Rendered at the
   * bottom of the message.
   *
   * The build order's rule is "a workflow that can fail silently is not done."
   * A lead that never reached the database has to be visible to Josh in the
   * one place he actually reads, which is this message — otherwise the only
   * record of the failure is a log line nobody opens.
   */
  warnings?: string[];
};

function compose(lead: LeadAlert): string {
  const lines: string[] = [];

  lines.push(`🔔 <b>${esc(lead.name)}</b>`);

  // The highest-value line in the whole message, so it sits directly under the
  // name: a report run is a stranger, a captured number is a lead. Labelled so
  // it can't be read as the listing's phone number two lines further down.
  // esc() is not optional — parse_mode is HTML and one stray '<' in a pasted
  // number fails the entire send with a 400.
  if (lead.capturedPhone) {
    lines.push(`📲 <b>Left their number:</b> ${esc(lead.capturedPhone)}`);
  }

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

  // Last, because it's operations rather than the lead. Present at all only
  // when something didn't work; an alert with no warnings block means the row
  // landed and the workflow fired.
  if (lead.warnings?.length) {
    lines.push('');
    lines.push('<b>Heads up</b>');
    for (const w of lead.warnings.slice(0, 4)) lines.push(`⚠️ ${esc(w)}`);
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
