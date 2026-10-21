"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Chip from "@/components/ui/Chip";
import CountUp from "@/components/ui/CountUp";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup";
import { practice, type PracticePlatform } from "@/data/practice";

export default function Practice() {
  return (
    <section id="practice" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10 md:py-16">
      <SectionHeading
        index="04"
        label="problem solving"
        title="Keeping the basics sharp."
        intro="I solve problems on LeetCode and CodeChef regularly, mostly data structures and algorithms."
      />

      <StaggerGroup className="grid gap-5 md:grid-cols-2" stagger={0.12}>
        {practice.map((p) => (
          <StaggerItem key={p.id}>
            <TerminalCard platform={p} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function TerminalCard({ platform }: { platform: PracticePlatform }) {
  return (
    <div className="glass h-full overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-fg/10 px-4 py-3">
        <span aria-hidden className="size-3 rounded-full bg-fg/15" />
        <span aria-hidden className="size-3 rounded-full bg-fg/15" />
        <span aria-hidden className="size-3 rounded-full bg-fg/15" />
        <span className="ml-3 font-mono text-xs text-muted">~/practice — {platform.id}</span>
      </div>

      <div className="p-6 font-mono sm:p-8">
        <p className="text-xs text-muted">
          <span className="text-accent-b">$</span> solved --platform {platform.id}
        </p>

        <p className="mt-4 font-display text-7xl font-semibold leading-none tracking-tight text-fg sm:text-8xl">
          <CountUp to={platform.count} suffix={platform.suffix} className="text-gradient" />
        </p>
        <p className="mt-2 text-sm text-muted">problems solved on {platform.name}</p>

        {/* Progress sweep (decorative: it is not a metric) */}
        <div aria-hidden className="mt-6 h-1 overflow-hidden rounded-full bg-fg/10">
          <motion.div
            className="bg-accent-gradient h-full w-1/3 rounded-full"
            initial={{ x: "-100%" }}
            whileInView={{ x: ["-100%", "300%"] }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>

        <p className="mt-6 text-xs text-muted">
          <span className="text-accent-b">$</span> topics
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {platform.topics.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <MagneticButton
            href={platform.href}
            external
            placeholder={platform.placeholder}
            ariaLabel={`View ${platform.name} profile`}
          >
            View profile <ArrowUpRight size={15} aria-hidden />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
