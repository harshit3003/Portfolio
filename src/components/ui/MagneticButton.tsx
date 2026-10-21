"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";

type Variant = "primary" | "ghost";

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  /** How far (0–1) the button follows the cursor. */
  strength?: number;
  ariaLabel?: string;
}

interface AnchorProps extends BaseProps {
  href: string;
  external?: boolean;
  /** When true the real URL has not been supplied yet: clicking shows a toast instead. */
  placeholder?: boolean;
  onClick?: undefined;
  type?: undefined;
  disabled?: undefined;
}

interface ButtonProps extends BaseProps {
  href?: undefined;
  external?: undefined;
  placeholder?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const base =
  "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-200 select-none";
const styles: Record<Variant, string> = {
  primary:
    "bg-accent-gradient text-on-accent shadow-[0_8px_30px_-8px_rgb(var(--glow)/0.6)] hover:shadow-[0_12px_40px_-8px_rgb(var(--glow)/0.8)]",
  ghost:
    "glass text-fg hover:bg-surface/90",
};

/** Button/link that gently follows the cursor (disabled for reduced-motion users). */
export default function MagneticButton(props: AnchorProps | ButtonProps) {
  const { children, className, variant = "ghost", strength = 0.3, ariaLabel } = props;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = cn(base, styles[variant], "disabled:opacity-60", className);
  const motionProps = {
    style: { x, y },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileTap: { scale: 0.96 },
    transition: { duration: 0.15 },
    "data-cursor": "hover",
  } as const;

  if (props.href !== undefined) {
    const { href, external, placeholder } = props;
    return (
      <motion.a
        {...motionProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external && !placeholder ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={
          placeholder
            ? (e) => {
                e.preventDefault();
                showToast("Link coming soon");
              }
            : undefined
        }
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      ref={ref as React.Ref<HTMLButtonElement>}
      type={props.type ?? "button"}
      className={cls}
      aria-label={ariaLabel}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {children}
    </motion.button>
  );
}
