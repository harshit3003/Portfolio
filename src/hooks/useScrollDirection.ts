"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

/** "down" once the user scrolls down past `threshold`, "up" on any upward scroll. */
export function useScrollDirection(threshold = 120): "up" | "down" {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<"up" | "down">("up");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < threshold) {
      setDirection("up");
    } else if (latest > previous + 4) {
      setDirection("down");
    } else if (latest < previous - 4) {
      setDirection("up");
    }
  });

  return direction;
}
