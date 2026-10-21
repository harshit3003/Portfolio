"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Command } from "cmdk";
import { ArrowUpRight, CornerDownLeft, Copy, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { navItems } from "@/data/nav";
import { githubUrl, profile } from "@/data/profile";
import { EASE } from "@/lib/motion";
import { OPEN_PALETTE_EVENT, showToast } from "@/lib/toast";
import { copyText, scrollToId } from "@/lib/utils";

/** ⌘/Ctrl+K palette: jump to sections, toggle theme, copy email, open GitHub. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    previouslyFocused.current?.focus();
  }, []);

  const show = useCallback(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  // Global shortcut + open event from the navbar.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) previouslyFocused.current = document.activeElement as HTMLElement | null;
          return !v;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, [show]);

  // Lock scroll while open and focus the input.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  const run = (fn: () => void) => () => {
    setOpen(false);
    // Let the dialog start closing before side effects (scroll, toast) fire.
    setTimeout(fn, 60);
  };

  const isDark = resolvedTheme === "dark";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center bg-bg/70 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="glass w-full max-w-xl overflow-hidden"
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                close();
              }
            }}
          >
            <Command loop label="Command palette" className="bg-surface/80">
              <div className="flex items-center gap-3 border-b border-fg/10 px-4">
                <Search size={16} className="text-muted" aria-hidden />
                <Command.Input
                  ref={inputRef}
                  placeholder="Type a command or search…"
                  className="h-14 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-muted"
                />
                <kbd className="rounded-md border border-fg/15 px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
              </div>

              <Command.List className="max-h-[50vh] overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-muted">No results found.</Command.Empty>

                <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-muted">
                  {navItems.map((item) => (
                    <Item key={item.id} value={`go ${item.label}`} onSelect={run(() => scrollToId(item.id))}>
                      <span className="font-mono text-xs text-accent-a">{item.index}</span>
                      <span className="flex-1">{item.label}</span>
                      <CornerDownLeft size={14} className="opacity-0 group-data-[selected=true]:opacity-60" aria-hidden />
                    </Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-muted">
                  <Item
                    value="toggle theme dark light"
                    onSelect={run(() => setTheme(isDark ? "light" : "dark"))}
                  >
                    {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
                    <span className="flex-1">Switch to {isDark ? "light" : "dark"} theme</span>
                  </Item>
                  <Item
                    value="copy email address"
                    onSelect={run(async () => {
                      const ok = await copyText(profile.email);
                      showToast(ok ? "Email copied!" : "Couldn't copy — press Ctrl+C on the address");
                    })}
                  >
                    <Copy size={16} aria-hidden />
                    <span className="flex-1">Copy email</span>
                    <span className="font-mono text-xs text-muted">{profile.email}</span>
                  </Item>
                  <Item
                    value="open github profile"
                    onSelect={run(() => window.open(githubUrl, "_blank", "noopener,noreferrer"))}
                  >
                    <ArrowUpRight size={16} aria-hidden />
                    <span className="flex-1">Open GitHub</span>
                  </Item>
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between border-t border-fg/10 px-4 py-2.5 font-mono text-[11px] text-muted">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Item({
  children,
  value,
  onSelect,
}: {
  children: ReactNode;
  value: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="group flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm text-fg data-[selected=true]:bg-fg/10"
    >
      {children}
    </Command.Item>
  );
}
