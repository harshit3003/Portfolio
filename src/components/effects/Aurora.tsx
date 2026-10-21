"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Blob {
  /** Orbit centre / radius as fractions of canvas size. */
  cx: number;
  cy: number;
  ax: number;
  ay: number;
  speed: number;
  phase: number;
  radius: number;
  /** RGB triplet */
  color: [number, number, number];
}

const BLOBS: Blob[] = [
  { cx: 0.28, cy: 0.35, ax: 0.18, ay: 0.14, speed: 0.00022, phase: 0.0, radius: 0.5, color: [255, 107, 61] },
  { cx: 0.72, cy: 0.3, ax: 0.16, ay: 0.18, speed: 0.00017, phase: 2.1, radius: 0.46, color: [232, 193, 112] },
  { cx: 0.55, cy: 0.7, ax: 0.2, ay: 0.12, speed: 0.00026, phase: 4.2, radius: 0.42, color: [190, 72, 38] },
];

/**
 * Lightweight canvas aurora. Rendered at half resolution, paused when scrolled
 * off-screen or the tab is hidden, and not mounted at all for reduced-motion users.
 */
export default function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SCALE = 0.5;
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let onScreen = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width * SCALE));
      height = Math.max(1, Math.floor(rect.height * SCALE));
      canvas.width = width;
      canvas.height = height;
    };

    const draw = (t: number) => {
      const dark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      const base = Math.max(width, height);
      for (const b of BLOBS) {
        const x = (b.cx + Math.cos(t * b.speed + b.phase) * b.ax) * width;
        const y = (b.cy + Math.sin(t * b.speed * 1.3 + b.phase) * b.ay) * height;
        const r = b.radius * base;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const [R, G, B] = b.color;
        const a = dark ? 0.22 : 0.14;
        g.addColorStop(0, `rgba(${R},${G},${B},${a})`);
        g.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(0);
    start();

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true;
      onScreen ? start() : stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  if (reduce) return null;

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />;
}
