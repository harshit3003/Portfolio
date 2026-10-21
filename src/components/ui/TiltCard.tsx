"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  disabled?: boolean;
}

/** Wrapper that gives its content a smoothed 3D tilt toward the cursor. */
export default function TiltCard({ children, className, max = 7, disabled }: TiltCardProps) {
  const reduce = useReducedMotion();
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18, mass: 0.5 };
  const rotateY = useSpring(useTransform(nx, [-0.5, 0.5], [-max, max]), spring);
  const rotateX = useSpring(useTransform(ny, [-0.5, 0.5], [max, -max]), spring);
  const off = reduce || disabled;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (off) return;
    const r = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    nx.set(0);
    ny.set(0);
  };

  return (
    <motion.div
      className={className}
      style={off ? undefined : { rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
