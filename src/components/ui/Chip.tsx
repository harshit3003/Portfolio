import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small mono tag used for tech stacks and facts. */
export default function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-fg/10 bg-fg/[0.04] px-3 py-1 font-mono text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
