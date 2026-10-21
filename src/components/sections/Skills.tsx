"use client";

import { motion } from "framer-motion";
import Chip from "@/components/ui/Chip";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup";
import { marqueeRowA, marqueeRowB, skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

// 12-column spans per group on large screens (4+4+4, then 6+6).
const spans = ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-6", "lg:col-span-6"];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10 md:py-16">
      <SectionHeading
        index="03"
        label="skills"
        title="The toolkit."
        intro="What I work with, grouped by what I use it for."
      />

      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12" stagger={0.08}>
        {skillGroups.map((group, i) => (
          <StaggerItem key={group.id} className={cn(spans[i])}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="glass h-full p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgb(var(--glow)/0.45)]"
            >
              <h3 className="font-mono text-xs text-muted">
                <span className="text-accent-a">{"//"}</span> {group.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Chip className="px-3.5 py-1.5 text-[13px] text-fg">{item}</Chip>
                  </li>
                ))}
              </ul>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-10 space-y-3">
        <Marquee items={marqueeRowA} duration={34} label="Languages and frontend technologies" />
        <Marquee items={marqueeRowB} reverse duration={38} label="Data tools and developer tools" />
      </Reveal>
    </section>
  );
}
