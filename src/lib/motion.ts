import type { Transition, Variants } from "framer-motion";

/** The one signature curve used across the whole site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Durations: micro interactions 150–250ms, reveals 500–800ms. */
export const DURATION = { micro: 0.2, reveal: 0.7 } as const;

export const revealTransition: Transition = { duration: DURATION.reveal, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: revealTransition },
};

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Masked slide-up used for headline words. */
export const maskWord: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};
