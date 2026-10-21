"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}

/** Parent that staggers its <StaggerItem> children in when scrolled into view. */
export function StaggerGroup({ children, className, stagger = 0.08, delay = 0, as = "div" }: StaggerGroupProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag data-reveal className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
