"use client";

import dynamic from "next/dynamic";

const Aurora = dynamic(() => import("@/components/effects/Aurora"), { ssr: false });

/**
 * Fixed ambient backdrop (grid + slow aurora glow) that sits behind every section,
 * so the sections below the hero share its look instead of a flat background.
 */
export default function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-lines absolute inset-0" />
      <Aurora />
    </div>
  );
}
