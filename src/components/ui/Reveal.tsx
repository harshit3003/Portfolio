"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  as?: "div" | "section" | "li" | "p" | "span";
}

/** Fade + rise + de-blur when scrolled into view (once). */
export default function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
