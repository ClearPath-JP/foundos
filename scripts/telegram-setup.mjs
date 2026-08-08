#!/usr/bin/env node
/**
 * One-time Telegram setup for foundos lead alerts.
 *
 *   node scripts/telegram-setup.mjs <bot-token>
 *
 * Finds your chat id, sends a test message so you know it works before you trust
 * it with a real lead, and prints the two lines to paste into .env.local.
 *
 * No dependencies — Node's built-in fetch only.
 */

const token = (process.argv[2] || process.env.TELEGRAM_BOT_TOKEN || '').trim();

const die = (msg) => {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
};

if (!token) {
  die(
    'No bot token.\n\n' +
      '  1. Open Telegram, search @BotFather\n' +
      '  2. Send /newbot, give it any name\n' +
      '  3. Copy the token it gives you, then run:\n\n' +
      '     node scripts/telegram-setup.mjs 1234567:AAE...\n'
  );
}

const api = (method) => `https://api.telegram.org/bot${token}/${method}`;

/**
 * A plain AbortController rather than AbortSignal.timeout() — the latter leaves
 * a live timer handle behind, and process.exit() on top of one trips a libuv
 * assertion on Windows.
 */
async function withTimeout(url, init = {}, ms = 10000) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ac.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function call(method) {
  let res;
  try {
    res = await withTimeout(api(method));
  } catch (err) {
    die(`Couldn't reach Telegram: ${err.message}`);
  }
  const json = await res.json().catch(() => null);
  if (!json?.ok) {
    die(`Telegram rejected ${method}: ${json?.description ?? `HTTP ${res.status}`}`);
  }
  return json.result;
}

// ---- 1. Is the token real? -------------------------------------------------
const me = await call('getMe');
console.log(`\n✓ Token works — bot is @${me.username}`);

// ---- 2. Who has talked to it? ----------------------------------------------
const updates = await call('getUpdates');
const chats = new Map();
for (const u of updates) {
  const msg = u.message ?? u.edited_message ?? u.channel_post;
  if (msg?.chat?.id != null) chats.set(msg.chat.id, msg.chat);
}

if (chats.size === 0) {
  die(
    `Nobody has messaged @${me.username} yet.\n\n` +
      '  Telegram will not let a bot message you first.\n' +
      `  Open Telegram, search @${me.username}, hit Start (or send "hi"),\n` +
      '  then run this exact command again.\n'
  );
}

if (chats.size > 1) {
  console.log('\n⚠ More than one chat has messaged this bot:\n');
  for (const c of chats.values()) {
    const who = c.username ? `@${c.username}` : [c.first_name, c.last_name].filter(Boolean).join(' ');
    console.log(`   ${c.id}  ${who || '(no name)'}  [${c.type}]`);
  }
  console.log('\n  Using the most recent one below. Swap the id by hand if that is wrong.');
}

const chat = [...chats.values()].at(-1);
const chatId = chat.id;

// ---- 3. Prove it actually delivers -----------------------------------------
let res;
try {
  res = await withTimeout(api('sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text:
        '🔔 <b>foundos lead alerts are live</b>\n\n' +
        'This is a test. Real ones will carry the business name, phone number, ' +
        'what the report found, and what to pitch.',
      parse_mode: 'HTML',
    }),
  });
} catch (err) {
  die(`Found chat ${chatId}, but the test message never sent: ${err.message}`);
}
const sent = await res.json().catch(() => null);
if (!sent?.ok) {
  die(`Found chat ${chatId} but the test message failed: ${sent?.description ?? res.status}`);
}

console.log(`✓ Test message sent — check Telegram, it should be there now.\n`);
console.log('Paste these two lines into .env.local, and add the same two in');
console.log('Vercel → Settings → Environment Variables → Production:\n');
console.log(`TELEGRAM_BOT_TOKEN=${token}`);
console.log(`TELEGRAM_CHAT_ID=${chatId}\n`);
