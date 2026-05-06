"use client";

import { useEffect, useRef } from "react";

/* ─── Config ─────────────────────────────────────── */
const TILE_W = 44;
const TILE_H = 22;
const BLOCK_D = 14; // visible depth of block sides
const GRID = 14;
const MOUSE_R = 140;

/* ─── Colors ─────────────────────────────────────── */
const TC = [193, 99, 58]; // terracotta RGB
const BL = [168, 196, 224]; // blue-white RGB

function rgba(c: number[], a: number) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

/* ─── Types ──────────────────────────────────────── */
interface Block {
  col: number;
  row: number;
  lvl: number;
  delay: number;
  born: number;
  alive: boolean;
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    /* Keep local refs for nested closures (TS narrowing) */
    const cv = canvas;
    const cx = ctx;

    const noMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf: number;
    let mx = -9999;
    let my = -9999;
    let w = 0;
    let h = 0;
    let ox = 0;
    let oy = 0;
    let t0 = performance.now();
    const blocks: Block[] = [];

    /* Height map — stepped pyramid with organic variation */
    const hmap: number[][] = [];
    for (let r = 0; r < GRID; r++) {
      hmap[r] = [];
      for (let c = 0; c < GRID; c++) {
        const edge = Math.min(r, c, GRID - 1 - r, GRID - 1 - c);
        const base = Math.min(edge + 1, 4);
        hmap[r][c] = base + (Math.random() > 0.7 ? 1 : 0);
      }
    }

    function initBlocks() {
      blocks.length = 0;
      for (let r = 0; r < GRID; r++) {
        for (let c = 0; c < GRID; c++) {
          for (let l = 0; l < hmap[r][c]; l++) {
            blocks.push({
              col: c,
              row: r,
              lvl: l,
              delay: (r + c) * 70 + l * 110 + Math.random() * 250,
              born: 0,
              alive: false,
            });
          }
        }
      }
      /* Sort for painter's algorithm — back to front */
      blocks.sort(
        (a, b) => a.row + a.col + a.lvl * 0.01 - (b.row + b.col + b.lvl * 0.01)
      );
    }

    function resize() {
      const dpr = Math.min(devicePixelRatio, 2);
      w = cv.offsetWidth;
      h = cv.offsetHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ox = w * 0.58;
      oy = h * 0.32;
      if (!blocks.length) initBlocks();
    }
    resize();

    function iso(c: number, r: number, l: number, yOff: number) {
      return {
        x: ox + (c - r) * (TILE_W / 2),
        y: oy + (c + r) * (TILE_H / 2) - l * BLOCK_D + yOff,
      };
    }

    function drawBlock(x: number, y: number, g: number) {
      const hw = TILE_W / 2;
      const hh = TILE_H / 2;

      /* Top face */
      cx.beginPath();
      cx.moveTo(x, y);
      cx.lineTo(x + hw, y + hh);
      cx.lineTo(x, y + TILE_H);
      cx.lineTo(x - hw, y + hh);
      cx.closePath();
      cx.fillStyle = `rgba(10,14,26,${0.75 + g * 0.25})`;
      cx.fill();
      cx.strokeStyle = rgba(TC, 0.12 + g * 0.5);
      cx.lineWidth = 0.5 + g * 0.8;
      cx.stroke();

      /* Left face */
      cx.beginPath();
      cx.moveTo(x - hw, y + hh);
      cx.lineTo(x, y + TILE_H);
      cx.lineTo(x, y + TILE_H + BLOCK_D);
      cx.lineTo(x - hw, y + hh + BLOCK_D);
      cx.closePath();
      cx.fillStyle = `rgba(7,10,20,${0.85 + g * 0.15})`;
      cx.fill();
      cx.strokeStyle = rgba(BL, 0.06 + g * 0.25);
      cx.lineWidth = 0.5;
      cx.stroke();

      /* Right face */
      cx.beginPath();
      cx.moveTo(x + hw, y + hh);
      cx.lineTo(x, y + TILE_H);
      cx.lineTo(x, y + TILE_H + BLOCK_D);
      cx.lineTo(x + hw, y + hh + BLOCK_D);
      cx.closePath();
      cx.fillStyle = `rgba(5,8,16,${0.9 + g * 0.1})`;
      cx.fill();
      cx.strokeStyle = rgba(BL, 0.04 + g * 0.18);
      cx.lineWidth = 0.5;
      cx.stroke();
    }

    /* Mouse tracking */
    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onTouch = (e: TouchEvent) => {
      const r = cv.getBoundingClientRect();
      mx = e.touches[0].clientX - r.left;
      my = e.touches[0].clientY - r.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    /* Click ripple state */
    let clickX = -9999;
    let clickY = -9999;
    let clickT = 0;
    const onClick = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      clickX = e.clientX - r.left;
      clickY = e.clientY - r.top;
      clickT = performance.now();
    };

    /* Draw loop */
    function draw(now: number) {
      cx.clearRect(0, 0, w, h);
      const elapsed = now - t0;

      /* Click ripple (fades over 600ms) */
      const clickAge = now - clickT;
      const clickActive = clickAge < 600;
      const clickRadius = clickActive ? 40 + clickAge * 0.3 : 0;
      const clickFade = clickActive ? 1 - clickAge / 600 : 0;

      for (const b of blocks) {
        if (!b.alive && elapsed > b.delay) {
          b.alive = true;
          b.born = elapsed;
        }
        if (!b.alive) continue;

        const age = elapsed - b.born;
        const prog = noMotion ? 1 : Math.min(1, age / 700);
        const ease = 1 - Math.pow(1 - prog, 3);
        const yOff = noMotion ? 0 : (1 - ease) * 50;

        const pos = iso(b.col, b.row, b.lvl, yOff);
        const cy = pos.y + TILE_H / 2;

        /* Mouse glow */
        const md = Math.hypot(mx - pos.x, my - cy);
        let glow = Math.max(0, 1 - md / MOUSE_R) * ease;

        /* Click ripple glow */
        if (clickActive) {
          const cd = Math.hypot(clickX - pos.x, clickY - cy);
          if (cd < clickRadius) {
            glow = Math.max(glow, clickFade * (1 - cd / clickRadius));
          }
        }

        /* Ambient shimmer after build (subtle) */
        if (prog >= 1 && !noMotion) {
          const shimmer =
            Math.sin(elapsed * 0.001 + b.col * 0.7 + b.row * 0.5 + b.lvl * 1.2) *
            0.5 +
            0.5;
          glow = Math.max(glow, shimmer * 0.08);
        }

        const lift = noMotion ? 0 : -glow * 5;
        drawBlock(pos.x, pos.y + lift, glow);
      }

      raf = requestAnimationFrame(draw);
    }

    t0 = performance.now();
    raf = requestAnimationFrame(draw);

    cv.addEventListener("mousemove", onMove);
    cv.addEventListener("touchmove", onTouch, { passive: true });
    cv.addEventListener("mouseleave", onLeave);
    cv.addEventListener("click", onClick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener("mousemove", onMove);
      cv.removeEventListener("touchmove", onTouch);
      cv.removeEventListener("mouseleave", onLeave);
      cv.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="neural-canvas" />;
}
