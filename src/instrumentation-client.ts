import { initBotId } from 'botid/client/core';

/**
 * Vercel BotID, added 2026-10-03. Invisible to real visitors: it attaches a
 * proof-of-browser to these requests, and each route rejects anything without
 * one via checkBotId(). /api/report is the one that costs money (Google
 * Places); /api/contact keeps form spam out of Telegram.
 *
 * Paths here must match the routes that call checkBotId(), or real visitors
 * get blocked.
 */
initBotId({
  protect: [
    { path: '/api/report', method: 'POST' },
    { path: '/api/contact', method: 'POST' },
  ],
});
