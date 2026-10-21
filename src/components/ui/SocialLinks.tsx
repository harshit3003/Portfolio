"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiCodechef, SiGithub, SiLeetcode } from "react-icons/si";
import { socials, type SocialLink } from "@/data/profile";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const icons: Record<SocialLink["id"], ReactNode> = {
  github: <SiGithub size={18} aria-hidden />,
  linkedin: <FaLinkedinIn size={18} aria-hidden />,
  leetcode: <SiLeetcode size={18} aria-hidden />,
  codechef: <SiCodechef size={18} aria-hidden />,
  email: <Mail size={18} aria-hidden />,
};

interface SocialLinksProps {
  /** "icon" = round icon buttons; "pill" = icon + label. */
  variant?: "icon" | "pill";
  className?: string;
}

/** Social/profile buttons with hover lift, icon nudge and tap feedback. */
export default function SocialLinks({ variant = "icon", className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {socials.map((s) => {
        const external = s.href.startsWith("http");
        return (
          <li key={s.id}>
            <motion.a
              href={s.href}
              data-cursor="hover"
              aria-label={s.placeholder ? `${s.label} (link coming soon)` : s.label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={
                s.placeholder
                  ? (e) => {
                      e.preventDefault();
                      showToast("Link coming soon");
                    }
                  : undefined
              }
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "glass group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full! text-fg transition-colors hover:text-accent-a",
                variant === "icon" ? "size-11" : "px-5 text-sm",
              )}
            >
              <span className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
                {icons[s.id]}
              </span>
              {variant === "pill" && <span>{s.label}</span>}
            </motion.a>
          </li>
        );
      })}
    </ul>
  );
}
