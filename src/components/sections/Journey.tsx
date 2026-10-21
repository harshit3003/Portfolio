"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useRef } from "react";
import Chip from "@/components/ui/Chip";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup";
import { journey, type JourneyItem } from "@/data/journey";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const timeline = journey.filter((j) => j.kind !== "leadership");
const leadership = journey.filter((j) => j.kind === "leadership");

export default function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  // The line "draws" from the first node to the last as the list scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="journey" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10 md:py-16">
      <SectionHeading
        index="05"
        label="education, work & leadership"
        title="Where I've learned, worked and led."
        intro="My education, my internship, and the clubs and communities I've helped run."
      />

      <div className="relative">
        {/* Track + drawn progress line */}
        <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-fg/10 md:left-1/2" />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-4 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent-a to-accent-b md:left-1/2"
          style={{ scaleY }}
        />

        <ol ref={listRef} className="space-y-8 md:space-y-10">
          {timeline.map((item, i) => (
            <TimelineItem key={item.id} item={item} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </ol>
      </div>

      <h3 className="mt-16 font-display text-2xl font-semibold text-fg md:mt-20">Leadership &amp; community</h3>
      <StaggerGroup className="mt-6 grid gap-5 md:grid-cols-3" stagger={0.1}>
        {leadership.map((item) => (
          <StaggerItem key={item.id}>
            <div className="glass h-full p-6">
              <Chip className="text-accent-b">
                <Briefcase size={12} className="mr-1.5" aria-hidden />
                Leadership
              </Chip>
              <h4 className="mt-4 font-display text-lg font-semibold leading-snug text-fg">{item.title}</h4>
              <p className="mt-1 text-sm text-muted">{item.org}</p>
              <ul className="mt-4 space-y-2">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent-a" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function TimelineItem({ item, side }: { item: JourneyItem; side: "left" | "right" }) {
  const ref = useRef<HTMLLIElement>(null);
  // "Reached" once the item passes the lower-middle of the viewport; stays reached.
  const reached = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  const isEdu = item.kind === "education";
  const Icon = isEdu ? GraduationCap : Briefcase;
  const kindLabel = { education: "Education", internship: "Internship", leadership: "Leadership" }[item.kind];

  return (
    <li ref={ref} className="relative grid md:grid-cols-2">
      {/* Node */}
      <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
        <div className="relative grid size-5 place-items-center">
          {reached && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-accent-b"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut", repeat: 2 }}
            />
          )}
          <motion.span
            className="relative size-3 rounded-full border-2 border-bg"
            animate={{
              backgroundColor: reached ? "rgb(var(--accent-b))" : "rgb(var(--muted))",
              scale: reached ? 1.25 : 1,
            }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: side === "left" ? -28 : 28, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn(
          "pl-12 md:pl-0",
          side === "left" ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14",
        )}
      >
        <div className="glass p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Chip className={isEdu ? "text-accent-a" : "text-accent-b"}>
              <Icon size={12} className="mr-1.5" aria-hidden />
              {kindLabel}
            </Chip>
            {item.period && <span className="font-mono text-xs text-muted">{item.period}</span>}
          </div>

          <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-fg">{item.title}</h3>
          <p className="mt-1 text-sm text-muted">{item.org}</p>
          {item.meta && <p className="mt-2 font-mono text-xs text-accent-b">{item.meta}</p>}

          {item.points.length > 0 && (
            <ul className="mt-4 space-y-2">
              {item.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent-a" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </li>
  );
}
