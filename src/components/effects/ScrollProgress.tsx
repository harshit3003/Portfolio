"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar across the top showing page scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="bg-accent-gradient fixed inset-x-0 top-0 z-[80] h-[3px] origin-left"
      style={{ scaleX }}
    />
  );
}
