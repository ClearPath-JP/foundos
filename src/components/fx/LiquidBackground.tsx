'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The liquid gradient, brought back 2026-10-04 at JP's ask. Same domain-warped simplex-noise shader as the
 * June "Aurora" homepage (components/GradientBackground.tsx, deleted in a79897f), with three changes:
 *
 * - Plain WebGL instead of three.js, so it needs no package (three was removed with the old homepage).
 * - It runs on phones too. The old one gated itself to 768px+, so no prospect holding a business card ever saw
 *   it. It renders at half resolution instead — the gradient is soft, so upscaling is invisible and the GPU
 *   does a quarter of the work — and stops whenever it is off screen or the tab is hidden.
 * - The card's purple and pink, not the old indigo.
 *
 * Reduced motion gets a single still frame of the same shader. No WebGL gets the static CSS wash underneath.
 */

// Brand palette as 0..1 RGB: white base, purple #6D28D9, pink #C52E98.
const C1 = [1, 1, 1] as const;
const C2 = [0.427, 0.157, 0.851] as const;
const C3 = [0.773, 0.18, 0.596] as const;
/** How strongly the colours show through. Dark text sits on top, so this stays gentle. */
const INTENSITY = 0.5;
/** Render scale. 0.5 = half resolution each way. */
const SCALE = 0.5;

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform float u_intensity;

// Ashima 2D simplex noise (MIT)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * snoise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main() {
  vec2 p = gl_FragCoord.xy / u_res.xy;
  p.x *= u_res.x / u_res.y;
  // Zoomed out, with a gentle warp: a few large soft folds, not marble (2026-10-04 review said it was noisy).
  p *= 0.4;
  float t = u_time * 0.04;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 0.9 * q + vec2(1.7, 9.2) + 0.15 * t), fbm(p + 0.9 * q + vec2(8.3, 2.8) - 0.12 * t));
  float n1 = 0.5 + 0.5 * fbm(p + 1.1 * r);
  float n2 = 0.5 + 0.5 * fbm(p + 1.1 * r + vec2(3.1, 1.2));
  vec3 col = u_c1;
  col = mix(col, u_c2, smoothstep(0.30, 0.95, n1) * u_intensity);
  col = mix(col, u_c3, smoothstep(0.38, 0.98, n2) * u_intensity * 0.8);
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function LiquidBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return; // static wash stays

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One oversized triangle covering the viewport.
    const buf = gl.createBuffer();
    if (!buf) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uTime = u('u_time');
    const uRes = u('u_res');
    gl.uniform3f(u('u_c1'), ...C1);
    gl.uniform3f(u('u_c2'), ...C2);
    gl.uniform3f(u('u_c3'), ...C3);
    gl.uniform1f(u('u_intensity'), INTENSITY);

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    // Start partway in, so the first (and, with reduced motion, only) frame is already swirled.
    let elapsed = 12;
    const draw = () => {
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    draw();
    setActive(true);

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let last = 0;
    let visible = true;

    const loop = (now: number) => {
      if (last) elapsed += Math.min(now - last, 100) / 1000;
      last = now;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (still || raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw();
    });
    ro.observe(canvas);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`fx-liquid ${className}`}>
      <canvas ref={canvasRef} className="fx-liquid-c" style={{ opacity: active ? 1 : 0 }} />
    </div>
  );
}

export default LiquidBackground;
