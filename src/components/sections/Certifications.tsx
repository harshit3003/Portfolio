"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Chip from "@/components/ui/Chip";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup";
import { certifications } from "@/data/certifications";

const shineVariants = {
  rest: { x: "-130%" },
  hover: { x: "230%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10 md:py-16">
      <SectionHeading
        index="06"
        label="certifications"
        title="Always learning."
        intro="Courses and simulations I've completed alongside my projects."
      />

      <StaggerGroup className="grid gap-5 md:grid-cols-3" stagger={0.1}>
        {certifications.map((c, i) => (
          <StaggerItem key={c.id}>
            {/* Outer wrapper floats gently; inner card handles hover so transforms don't fight. */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              className="h-full"
            >
              <motion.article
                initial="rest"
                animate="rest"
                whileHover="hover"
                className="glass relative h-full overflow-hidden p-6"
              >
                <motion.div
                  aria-hidden
                  variants={shineVariants}
                  className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
                <span className="bg-accent-gradient grid size-11 place-items-center rounded-2xl text-on-accent">
                  <Award size={20} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-fg">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{c.issuer}</p>
                {(c.detail || c.year) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.detail && <Chip className="text-accent-b">{c.detail}</Chip>}
                    {c.year && <Chip>{c.year}</Chip>}
                  </div>
                )}
              </motion.article>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
