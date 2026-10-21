"use client";

import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";

/**
 * Lenis smooth scrolling. Lenis drives the *native* window scroll position, so Framer
 * Motion's useScroll() sees every update and stays perfectly in sync.
 * Disabled for reduced-motion users.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    // `anchors` makes every #hash link glide instead of jump.
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: true, anchors: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reduce]);

  return null;
}
