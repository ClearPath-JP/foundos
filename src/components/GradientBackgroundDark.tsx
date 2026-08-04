"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dark violet variant of GradientBackground — a slow WebGL "liquid" aurora
 * (near-black -> indigo -> violet) for dark-themed pages. Same engine as the
 * light version; only the palette, base, and fallback differ. Kept as a
 * separate file so the live (light) Aurora is never at risk.
 *
 * - Desktop + motion-enabled: animated WebGL aurora (three.js, lazy-loaded).
 * - Everyone else: a matching static CSS gradient (zero GPU cost).
 */

// Palette as 0..1 RGB. Base near-black #08070d, indigo #6366f1, violet #a855f7.
const C1: [number, number, number] = [0.031, 0.027, 0.051];
const C2: [number, number, number] = [0.388, 0.4, 0.945];
const C3: [number, number, number] = [0.659, 0.333, 0.969];
const INTENSITY = 0.85;
const CLEAR = 0x08070d;

const STATIC_BG =
  "radial-gradient(60% 55% at 22% 14%, rgba(99,102,241,0.30), transparent 70%)," +
  "radial-gradient(55% 50% at 82% 24%, rgba(168,85,247,0.24), transparent 72%)," +
  "radial-gradient(75% 60% at 50% 96%, rgba(139,92,246,0.16), transparent 74%)," +
  "#08070d";

const VERTEX = /* glsl */ `
precision highp float;
attribute vec3 position;
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float u_time;
uniform vec2  u_res;
uniform vec3  u_c1;
uniform vec3  u_c2;
uniform vec3  u_c3;
uniform float u_intensity;

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
  for (int i = 0; i < 4; i++) { v += a * snoise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p  = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.045;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 1.5 * q + vec2(1.7, 9.2) + 0.15 * t),
                fbm(p + 1.5 * q + vec2(8.3, 2.8) - 0.12 * t));

  float n1 = 0.5 + 0.5 * fbm(p + 2.0 * r);
  float n2 = 0.5 + 0.5 * fbm(p + 2.0 * r + vec2(3.1, 1.2));

  // bias the aurora toward the top of the frame so it fades into the dark body
  float topBias = smoothstep(1.0, 0.15, uv.y);

  vec3 col = u_c1;
  col = mix(col, u_c2, smoothstep(0.42, 0.92, n1) * u_intensity * topBias);
  col = mix(col, u_c3, smoothstep(0.46, 0.95, n2) * u_intensity * 0.85 * topBias);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function GradientBackgroundDark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduce) return;

    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | null = null;

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return;
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
        return;
      }

      renderer.setClearColor(CLEAR, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      const uniforms = {
        u_time: { value: 0 },
        u_res: { value: new THREE.Vector2(1, 1) },
        u_c1: { value: new THREE.Vector3(...C1) },
        u_c2: { value: new THREE.Vector3(...C2) },
        u_c3: { value: new THREE.Vector3(...C3) },
        u_intensity: { value: INTENSITY },
      };

      const setSize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        const el = renderer.domElement;
        uniforms.u_res.value.set(el.width, el.height);
      };

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
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
      setActive(true);

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
          last = performance.now();
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
      <div className="absolute inset-0" style={{ background: STATIC_BG }} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-out"
        style={{ opacity: active ? 1 : 0 }}
      />
    </div>
  );
}
