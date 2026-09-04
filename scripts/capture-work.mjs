/**
 * Capture screenshots of the concept sites for the "Work I've built" section.
 *
 *   node scripts/capture-work.mjs            # dev server on :3002
 *   node scripts/capture-work.mjs 3000       # or wherever it's running
 *
 * Zero dependencies. Drives headless Edge (or Chrome) over the DevTools
 * protocol, the same way the taste-gate auditor does, so nothing new gets
 * installed. The brand spec asks for 1200x800; that's the viewport size here,
 * not a full-page capture, because a card wants the top of the page, not five
 * thousand pixels of it.
 *
 * ⚠️ ONLY CAPTURE SITES WE OWN OUTRIGHT.
 * src/lib/contact.ts spells out why, and an audit on 2026-09-03 found the cost
 * of getting it wrong: the truck demo's hero was a photograph of a real
 * business — its name, its phone number and its customers' faces — being shown
 * as a fictional Atlanta company. Putting a spec build made for a live prospect
 * (Williamson, Caribbean Spice, Clahvay, Istanbul, Heirloom, Babygirl, Amistad)
 * on the homepage reads as "client" to every visitor, which is untrue, and it
 * risks the deal if that owner ever sees it. A build joins TARGETS the day that
 * client pays, or the day it is rebranded into a fictional concept.
 */

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PORT_ARG = process.argv[2] || "3002";
const BASE = `http://localhost:${PORT_ARG}`;
const OUT = resolve(process.cwd(), "public/work");

/** Concept sites we own outright. Nothing here belongs to a real business. */
const TARGETS = [
  { slug: "truck", url: `${BASE}/demo/truckos?biz=truck` },
  { slug: "bakery", url: `${BASE}/demo/truckos?biz=bakery` },
];

const SHOT = { w: 1200, h: 800, dpr: 2 };

const CDP_PORT = 9740 + (process.pid % 200);
const BROWSERS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const bin = BROWSERS.find((p) => existsSync(p));
if (!bin) {
  console.error("No Edge or Chrome found at the usual Windows paths.");
  process.exit(2);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const proc = spawn(
  bin,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--force-color-profile=srgb",
    `--remote-debugging-port=${CDP_PORT}`,
    "about:blank",
  ],
  { stdio: "ignore", detached: false }
);

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { res, rej } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((res, rej) => {
      this.pending.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (this.pending.delete(id)) rej(new Error(`CDP timeout: ${method}`));
      }, 30000);
    });
  }
}

async function findPageTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`).then((r) => r.json());
      const page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch {
      /* browser still starting */
    }
    await sleep(250);
  }
  throw new Error("Headless browser never came up.");
}

let exitCode = 0;
try {
  // Fail early and clearly if the dev server isn't up, rather than shipping
  // screenshots of a connection-refused page.
  const probe = await fetch(BASE, { method: "HEAD" }).catch(() => null);
  if (!probe || !probe.ok) {
    throw new Error(`Nothing answering at ${BASE}. Start the dev server first: npm run dev`);
  }

  mkdirSync(OUT, { recursive: true });

  const target = await findPageTarget();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res, { once: true });
    ws.addEventListener("error", () => rej(new Error("WebSocket to browser failed")), { once: true });
  });
  const cdp = new CDP(ws);
  await cdp.send("Page.enable");

  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: SHOT.w,
    height: SHOT.h,
    deviceScaleFactor: SHOT.dpr,
    mobile: false,
  });

  for (const t of TARGETS) {
    await cdp.send("Page.navigate", { url: t.url });
    await sleep(2600); // fonts, images and the demo's own entrance settle
    const shot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    const file = resolve(OUT, `${t.slug}.png`);
    writeFileSync(file, Buffer.from(shot.data, "base64"));
    console.log(`  ${t.slug.padEnd(8)} ${SHOT.w}x${SHOT.h}@${SHOT.dpr}x  ->  public/work/${t.slug}.png`);
  }

  console.log(`\nCaptured ${TARGETS.length} concept ${TARGETS.length === 1 ? "site" : "sites"}.`);
} catch (err) {
  console.error("capture-work failed:", err.message);
  exitCode = 1;
} finally {
  try {
    proc.kill();
  } catch {
    /* already gone */
  }
  process.exit(exitCode);
}
