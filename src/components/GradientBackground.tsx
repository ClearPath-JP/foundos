"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-page, very-soft animated gradient that sits behind all page content.
 *
 * - Desktop + motion-enabled visitors get a slow WebGL "liquid" blend
 *   (white -> indigo -> violet) rendered with three.js (lazy-loaded).
 * - Everyone else (mobile, reduced-motion, or no WebGL) gets a matching
 *   *static* CSS gradient — same palette, zero battery/GPU cost.
 *
 * The base stays close to white so body text on top remains readable.
 */

// Brand palette as 0..1 RGB. Indigo #4f46e5, violet #7c3aed, white base.
const C1: [number, number, number] = [1, 1, 1];
const C2: [number, number, number] = [0.3098, 0.2745, 0.898]; // indigo-600
const C3: [number, number, number] = [0.4863, 0.2275, 0.9294]; // violet-600
const INTENSITY = 0.28; // how strongly the colors show through (0 = pure white)

// Static fallback — soft indigo/violet blooms over white. Tuned to read like
// the first frame of the animated version.
const STATIC_BG =
  "radial-gradient(60% 55% at 22% 18%, rgba(79,70,229,0.08), transparent 70%)," +
  "radial-gradient(55% 50% at 82% 28%, rgba(124,58,237,0.06), transparent 72%)," +
  "radial-gradient(70% 60% at 55% 95%, rgba(99,102,241,0.05), transparent 72%)," +
  "#ffffff";

const VERTEX = /* glsl */ `
precision highp float;
attribute vec3 position;
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float u_time;
uniform vec2  u_res;
uniform vec3  u_c1;
uniform vec3  u_c2;
uniform vec3  u_c3;
uniform float u_intensity;

// --- Ashima 2D simplex noise (MIT) -----------------------------------------
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p  = uv;
  p.x *= u_res.x / u_res.y; // correct for aspect ratio

  float t = u_time * 0.04; // slow drift

  // Domain warping -> organic "liquid" flow
  vec2 q = vec2(fbm(p + vec2(0.0, t)),
                fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 1.5 * q + vec2(1.7, 9.2) + 0.15 * t),
                fbm(p + 1.5 * q + vec2(8.3, 2.8) - 0.12 * t));

  float n1 = 0.5 + 0.5 * fbm(p + 2.0 * r);
  float n2 = 0.5 + 0.5 * fbm(p + 2.0 * r + vec2(3.1, 1.2));

  vec3 col = u_c1;
  col = mix(col, u_c2, smoothstep(0.35, 0.85, n1) * u_intensity);
  col = mix(col, u_c3, smoothstep(0.40, 0.90, n2) * u_intensity * 0.8);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false); // true once WebGL is running

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only animate on desktop with motion allowed.
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduce) return; // -> static CSS fallback stays visible

    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | null = null;

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return; // three failed to load -> keep static fallback
      }
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: false,
          powerPreference: "low-power",
        });
      } catch {
        return; // no WebGL -> keep static fallback
      }

      renderer.setClearColor(0xffffff, 1);
      const pr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(pr);

      const setSize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false); // don't let three override our CSS sizing
        const el = renderer.domElement;
        uniforms.u_res.value.set(el.width, el.height);
      };

      const uniforms = {
        u_time: { value: 0 },
        u_res: { value: new THREE.Vector2(1, 1) },
        u_c1: { value: new THREE.Vector3(...C1) },
        u_c2: { value: new THREE.Vector3(...C2) },
        u_c3: { value: new THREE.Vector3(...C3) },
        u_intensity: { value: INTENSITY },
      };

      const geometry = new THREE.BufferGeometry();
      // One oversized triangle that covers the whole clip-space viewport.
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
          3
        )
      );

      const material = new THREE.RawShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms,
        depthTest: false,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;

      const scene = new THREE.Scene();
      scene.add(mesh);
      const camera = new THREE.Camera();

      setSize();
      setActive(true); // fade the canvas in over the static layer

      let elapsed = 0;
      let last = performance.now();

      const loop = (now: number) => {
        elapsed += (now - last) / 1000;
        last = now;
        uniforms.u_time.value = elapsed;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };

      const onVisibility = () => {
        if (document.hidden) {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        } else if (!raf) {
          last = performance.now(); // avoid a time jump on resume
          raf = requestAnimationFrame(loop);
        }
      };

      window.addEventListener("resize", setSize);
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("resize", setSize);
        document.removeEventListener("visibilitychange", onVisibility);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    })();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      {/* Static fallback — always painted; covered by the canvas when active. */}
      <div className="absolute inset-0" style={{ background: STATIC_BG }} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-out"
        style={{ opacity: active ? 1 : 0 }}
      />
    </div>
  );
}
