"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup";
import { profile } from "@/data/profile";

type Kind = "kw" | "str" | "num" | "prop" | "punc" | "com";
type Token = { t: string; k: Kind };

const kind: Record<Kind, string> = {
  kw: "text-accent-a",
  str: "text-accent-b",
  num: "text-[#5b7a49] dark:text-[#a8c78f]",
  prop: "text-fg",
  punc: "text-muted",
  com: "text-muted italic",
};

const tk = (t: string, k: Kind): Token => ({ t, k });

/** The code card content, written as tokens so it can be syntax-highlighted without a library. */
const LINES: Token[][] = [
  [tk("// about.ts", "com")],
  [tk("const ", "kw"), tk("harshit", "prop"), tk(" = {", "punc")],
  [tk("  role", "prop"), tk(": ", "punc"), tk('"Software Developer"', "str"), tk(",", "punc")],
  [tk("  education", "prop"), tk(": ", "punc"), tk('"B.Tech CSE (AIML), ABES"', "str"), tk(",", "punc")],
  [tk("  gpa", "prop"), tk(": ", "punc"), tk("7.33", "num"), tk(",", "punc")],
  [tk("  location", "prop"), tk(": ", "punc"), tk('"Ghaziabad, India"', "str"), tk(",", "punc")],
  [
    tk("  languages", "prop"),
    tk(": [", "punc"),
    tk('"C++"', "str"),
    tk(", ", "punc"),
    tk('"Python"', "str"),
    tk(", ", "punc"),
    tk('"JavaScript"', "str"),
    tk("],", "punc"),
  ],
  [tk("  built", "prop"), tk(": [", "punc"), tk('"KishanMarket"', "str"), tk(", ", "punc"), tk('"Stock Dashboard"', "str"), tk("],", "punc")],
  [
    tk("  solved", "prop"),
    tk(": { ", "punc"),
    tk("leetcode", "prop"),
    tk(": ", "punc"),
    tk('"250+"', "str"),
    tk(", ", "punc"),
    tk("codechef", "prop"),
    tk(": ", "punc"),
    tk('"250+"', "str"),
    tk(" },", "punc"),
  ],
  [tk("};", "punc")],
];

const PLAIN = LINES.map((l) => l.map((t) => t.t).join("")).join("\n");
const TOTAL = PLAIN.length;

const facts = ["ABES Engineering College", "B.Tech CSE (AIML)", "GPA 7.33 / 10", "Ghaziabad, India"];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10 md:py-16">
      <SectionHeading
        index="01"
        label="about"
        title="Hi, I'm Harshit."
        intro="A quick intro, first in plain words and then in code."
      />

      <div className="grid grid-cols-12 items-start gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <Reveal>
            <p className="text-lg leading-relaxed text-fg">
              I&apos;m {profile.name}, a Computer Science and Engineering (AIML) student at ABES Engineering College
              in Ghaziabad.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 leading-relaxed text-muted">
              I enjoy turning ideas into things that work, like a real-time marketplace for farmers or a dashboard for
              financial data. When I&apos;m not building, I&apos;m solving problems on LeetCode and CodeChef (250+ on each so
              far). I recently finished an internship at Codec Technologies, where I built SupportDesk AI.
            </p>
          </Reveal>

          <StaggerGroup className="mt-8 flex flex-wrap gap-3" stagger={0.07}>
            {facts.map((f, i) => (
              <StaggerItem key={f}>
                <motion.span
                  className="glass inline-flex rounded-full! px-4 py-2 font-mono text-xs text-fg"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {f}
                </motion.span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal>
            <CodeCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Editor-style window that types its content when scrolled into view. */
function CodeCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setTyped(TOTAL);
      return;
    }
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= TOTAL) {
          clearInterval(id);
          return n;
        }
        return Math.min(TOTAL, n + 2);
      });
    }, 18);
    return () => clearInterval(id);
  }, [inView, reduce]);

  // Slice the token stream to `typed` characters.
  const rendered = useMemo(() => {
    let remaining = typed;
    return LINES.map((line) => {
      const out: Token[] = [];
      for (const token of line) {
        if (remaining <= 0) break;
        const take = Math.min(token.t.length, remaining);
        out.push({ t: token.t.slice(0, take), k: token.k });
        remaining -= take;
      }
      remaining -= 1; // newline
      return out;
    });
  }, [typed]);

  const done = typed >= TOTAL;

  return (
    <div ref={ref} className="glass overflow-hidden">
      <div className="flex items-center gap-2 border-b border-fg/10 px-4 py-3">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">about.ts</span>
      </div>
      <pre
        role="img"
        aria-label={`Code snippet summarising Harshit: ${PLAIN.replace(/\n/g, " ")}`}
        className="no-scrollbar min-h-[19rem] overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm"
      >
        <code aria-hidden>
          {rendered.map((line, li) => (
            <div key={li} className="min-h-7 whitespace-pre">
              {line.map((tok, ti) => (
                <span key={ti} className={kind[tok.k]}>
                  {tok.t}
                </span>
              ))}
              {li === rendered.findLastIndex((l) => l.length > 0) && !done && <span className="caret" />}
            </div>
          ))}
          {done && <span className="caret" />}
        </code>
      </pre>
    </div>
  );
}
