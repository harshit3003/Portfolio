"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { EASE } from "@/lib/motion";
import { openPalette } from "@/lib/toast";
import { cn, scrollToId } from "@/lib/utils";

const ids = navItems.map((n) => n.id);

/** Floating, section-aware nav pill. Hides on scroll-down, returns on scroll-up. */
export default function Navbar() {
  const active = useActiveSection(ids);
  const direction = useScrollDirection();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  const hidden = direction === "down" && !open;

  // Mobile menu: lock scroll, close on Escape, return focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Wait a frame so scroll-lock is released before scrolling.
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <nav
          aria-label="Primary"
          className="glass flex items-center gap-1 rounded-full! py-1.5 pl-2 pr-1.5 md:gap-2"
        >
          <a
            href="#top"
            data-cursor="hover"
            aria-label={`${profile.name} — back to top`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-accent-gradient grid size-9 place-items-center rounded-full font-display text-sm font-bold text-on-accent"
          >
            {profile.initials}
          </a>

          <ul className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    data-cursor="hover"
                    aria-current={isActive ? "location" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-fg/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            data-cursor="hover"
            onClick={openPalette}
            aria-label="Open command palette"
            className="ml-1 hidden min-h-11 items-center gap-1.5 rounded-full border border-fg/10 px-3 font-mono text-xs text-muted transition-colors hover:text-fg md:flex"
          >
            <Command size={13} aria-hidden /> K
          </button>

          <ThemeToggle />

          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-fg/10 md:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 bg-bg/90 px-6 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    className="flex min-h-14 items-baseline gap-4 border-b border-fg/10 py-3 font-display text-3xl font-semibold text-fg"
                  >
                    <span className="font-mono text-xs text-accent-a">{item.index}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openPalette();
              }}
              className="glass mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full! font-mono text-sm text-muted"
            >
              <Command size={14} aria-hidden /> Open command palette
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
