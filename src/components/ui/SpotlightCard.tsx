"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Shared-layout id so the card can morph into a modal. */
  layoutId?: string;
  onClick?: () => void;
  /** Spotlight radius in px. */
  size?: number;
}

/** Glass card with a soft glow that follows the cursor. */
export default function SpotlightCard({ children, className, layoutId, onClick, size = 420 }: SpotlightCardProps) {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgb(var(--glow) / 0.17), transparent 62%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <motion.div
      layoutId={layoutId}
      style={{ borderRadius: 22 }}
      className={cn("glass group overflow-hidden", className)}
      onMouseMove={onMove}
      onClick={onClick}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
