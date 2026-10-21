"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReady } from "@/components/layout/Providers";
import { EASE } from "@/lib/motion";

const LINE = 'console.log("Hello, World")';

/** <1.8s typed-line preloader. Flips `ready` so the hero entrance starts as it exits. */
export default function Preloader() {
  const { setReady } = useReady();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  // Typing effect (~0.9s for 27 chars).
  useEffect(() => {
    if (reduce) {
      setCount(LINE.length);
      return;
    }
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= LINE.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 32);
    return () => clearInterval(id);
  }, [reduce]);

  // Total on-screen time: 1.35s (0.45s with reduced motion), exit animation adds 0.5s.
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setReady(true);
    }, reduce ? 450 : 1350);
    return () => clearTimeout(t);
  }, [reduce, setReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[110] grid place-items-center bg-bg"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: EASE }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="px-6 font-mono text-sm text-fg sm:text-lg">
            <span className="text-accent-a">&gt; </span>
            <span>{LINE.slice(0, count)}</span>
            <span className="caret" aria-hidden />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
