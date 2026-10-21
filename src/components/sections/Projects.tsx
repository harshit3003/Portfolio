"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Chip from "@/components/ui/Chip";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup";
import TiltCard from "@/components/ui/TiltCard";
import { projects, type Project } from "@/data/projects";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  // Sticky-stack: as the second card slides over, the first one recedes (desktop only; harmless on mobile).
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start 0.5", "end 0.7"] });
  const recede = useSpring(useTransform(scrollYProgress, [0.25, 0.9], [1, 0.94]), { stiffness: 120, damping: 24 });
  const dim = useTransform(scrollYProgress, [0.25, 0.9], [1, 0.55]);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10 md:py-16">
      <SectionHeading
        index="02"
        label="projects"
        title="Things I've built."
        intro="Two things I've built: a marketplace for farmers and a dashboard for financial data. Open a card for the details."
      />

      <div ref={stackRef} className="relative">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={cn(
              "lg:sticky",
              i === 0 ? "mb-6 lg:top-24 lg:mb-[16vh]" : "lg:top-36",
            )}
          >
            <motion.div
              style={i === 0 ? { scale: recede, opacity: dim } : undefined}
              className="origin-top"
            >
              <ProjectCard project={project} open={selectedId === project.id} onOpen={() => setSelectedId(project.id)} />
            </motion.div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ───────────────────────── Card ───────────────────────── */

function ProjectCard({ project, open, onOpen }: { project: Project; open: boolean; onOpen: () => void }) {
  const featured = Boolean(project.featured);

  return (
    <TiltCard disabled={open} max={featured ? 4 : 5}>
      <SpotlightCard
        layoutId={`card-${project.id}`}
        onClick={onOpen}
        className="cursor-pointer"
        size={featured ? 560 : 380}
      >
        <article className={cn("p-7 sm:p-9", featured && "md:p-12")} aria-labelledby={`title-${project.id}`}>
          <div className={cn("grid gap-10", featured && "lg:grid-cols-12 lg:gap-14")}>
            <div className={cn(featured && "lg:col-span-6")}>
              <div className="flex items-center gap-3 font-mono text-xs text-muted">
                {featured ? (
                  <span className="bg-accent-gradient rounded-full px-3 py-1 text-[11px] font-medium text-on-accent">
                    Featured
                  </span>
                ) : (
                  <span className="rounded-full border border-fg/15 px-3 py-1 text-[11px]">Project</span>
                )}
                <span>{project.subtitle}</span>
              </div>

              <h3
                id={`title-${project.id}`}
                className={cn(
                  "mt-5 font-display font-semibold leading-[1.05] tracking-tight text-fg",
                  featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl",
                )}
              >
                {featured ? <span className="text-gradient">{project.title}</span> : project.title}
              </h3>

              <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <MagneticButton variant="primary" onClick={onOpen} ariaLabel={`Open details for ${project.title}`}>
                  Details <Expand size={15} aria-hidden />
                </MagneticButton>
                <MagneticButton
                  href={project.link.href}
                  external
                  placeholder={project.link.placeholder}
                  ariaLabel={`${project.link.label} for ${project.title}`}
                >
                  {project.link.label} <ArrowUpRight size={15} aria-hidden />
                </MagneticButton>
              </div>
            </div>

            {featured && (
              <div className="lg:col-span-6">
                <p className="font-mono text-xs text-muted">
                  <span className="text-accent-a">{"//"}</span> what&apos;s inside
                </p>
                <StaggerGroup as="ul" className="mt-4 space-y-4" stagger={0.1}>
                  {project.highlights.map((h) => (
                    <StaggerItem as="li" key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                      <span aria-hidden className="bg-accent-gradient mt-2 size-1.5 shrink-0 rounded-full" />
                      <span>{h}</span>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            )}
          </div>

          <TagRow tags={project.tags} className="mt-9" />
        </article>
      </SpotlightCard>
    </TiltCard>
  );
}

function TagRow({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <StaggerGroup className={cn("flex flex-wrap gap-2", className)} stagger={0.05}>
      {tags.map((tag) => (
        <StaggerItem key={tag}>
          <motion.span whileHover={{ y: -3, scale: 1.04 }} transition={{ duration: 0.2 }} className="inline-block">
            <Chip>{tag}</Chip>
          </motion.span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

/* ───────────────────────── Modal ───────────────────────── */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => onClose(), [onClose]);

  // Focus management, scroll lock, Escape + focus trap.
  useEffect(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
      returnFocus.current?.focus?.();
    };
  }, [close]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-bg/75 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <SpotlightCard
        layoutId={`card-${project.id}`}
        className="w-full max-w-2xl bg-surface/90"
        size={500}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${project.id}`}
          className="max-h-[85vh] overflow-y-auto p-7 sm:p-10"
        >
          <button
            ref={closeRef}
            type="button"
            data-cursor="hover"
            onClick={close}
            aria-label="Close project details"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-fg/10"
          >
            <X size={20} aria-hidden />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
          >
            <p className="font-mono text-xs text-muted">{project.subtitle}</p>
            <h3
              id={`modal-title-${project.id}`}
              className="mt-3 pr-10 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
            >
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

            <ul className="mt-6 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                  <span aria-hidden className="bg-accent-gradient mt-2 size-1.5 shrink-0 rounded-full" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                variant="primary"
                href={project.link.href}
                external
                placeholder={project.link.placeholder}
              >
                {project.link.label} <ArrowUpRight size={15} aria-hidden />
              </MagneticButton>
              <MagneticButton onClick={close}>Close</MagneticButton>
            </div>
          </motion.div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
