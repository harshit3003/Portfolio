"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function BackToTop() {
  return (
    <motion.button
      type="button"
      data-cursor="hover"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="glass inline-flex min-h-11 items-center gap-2 rounded-full! px-5 font-mono text-xs text-fg"
    >
      Back to top <ArrowUp size={14} aria-hidden />
    </motion.button>
  );
}
