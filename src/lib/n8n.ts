/**
 * Outbound webhook to n8n.
 *
 * The rulebook's Sample-site runbook fires "immediately when an `audit_box`
 * lead drops a phone number." That workflow is phase 4 and does not exist yet,
 * so this is a wire with nothing on the other end of it — which is exactly the
 * shape of failure the build order names: *"A workflow that can fail silently
 * is not done."*
 *
 * So every path is loud and every path is caught:
 *
 *   - Not configured  → { ok: false, reason: 'not_configured' } + one warn.
 *   - Non-2xx         → { ok: false, reason: 'http_<status>' } + an error log
 *                        carrying the response body.
 *   - Timeout / throw → { ok: false, reason: 'timeout' | 'network' } + error.
 *
 * It never throws. The visitor typed their number into a form; a dead phase-4
 * workflow must not cost them the capture. `/api/lead` turns the returned
 * reason into a line in Josh's Telegram alert, so the failure is visible to a
 * human and not just to a log nobody opens.
 *
 * Zero dependencies on purpose — this is one fetch.
 */

/** Matches notify.ts. Josh's phone alert and this webhook share a deadline. */
const TIMEOUT_MS = 4000;

/** So an unconfigured deployment warns once, not once per captured lead. */
let warnedUnconfigured = false;

export type WebhookResult = { ok: boolean; reason?: string };

export async function fireLeadWebhook(payload: unknown): Promise<WebhookResult> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;

  if (!url) {
    if (!warnedUnconfigured) {
      warnedUnconfigured = true;
      console.warn(
        '[n8n] N8N_LEAD_WEBHOOK_URL is not set — no workflow is firing on captured leads. Expected until phase 4.'
      );
    }
    return { ok: false, reason: 'not_configured' };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    });

    if (!res.ok) {
      // The body is where n8n puts the useful part — a missing node, a
      // deactivated workflow. Truncated because a 500 page can be enormous.
      const body = await res.text().catch(() => '');
      console.error('[n8n] webhook responded', res.status, body.slice(0, 500));
      return { ok: false, reason: `http_${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    // AbortSignal.timeout rejects with a TimeoutError, which is worth telling
    // apart from a refused connection: one means n8n is up and stuck, the
    // other means it isn't there.
    const timedOut = err instanceof Error && err.name === 'TimeoutError';
    console.error(`[n8n] webhook ${timedOut ? 'timed out' : 'failed'}:`, err);
    return { ok: false, reason: timedOut ? 'timeout' : 'network' };
  }
}
