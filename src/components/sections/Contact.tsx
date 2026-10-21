"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check, Copy, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import ContactForm from "@/components/sections/ContactForm";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import SocialLinks from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { showToast } from "@/lib/toast";
import { copyText } from "@/lib/utils";

const HEADLINE = ["Let's", "build", "something", "together."];

export default function Contact() {
  const headRef = useRef<HTMLHeadingElement>(null);
  // Words light up one by one as the headline scrolls up the viewport.
  const { scrollYProgress } = useScroll({ target: headRef, offset: ["start 0.9", "start 0.4"] });

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10 md:py-16">
      <Reveal>
        <p className="font-mono text-xs text-muted">
          <span className="text-accent-a">{"//"}</span> 07 — contact
        </p>
      </Reveal>

      <h2
        ref={headRef}
        aria-label={HEADLINE.join(" ")}
        className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
      >
        {HEADLINE.map((word, i) => (
          <Word key={word} progress={scrollYProgress} range={[i / HEADLINE.length, (i + 1) / HEADLINE.length]}>
            {word}
          </Word>
        ))}
      </h2>

      <Reveal delay={0.05}>
        <p className="mt-6 max-w-xl text-lg text-muted">
          I'm open to software roles, projects and collaborations. Email is the quickest way to reach me.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-12 gap-y-10 lg:gap-x-12">
        <Reveal className="col-span-12 lg:col-span-5">
          <div className="space-y-6">
            <CopyEmail />

            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-accent-b" aria-hidden />
                <span className="text-fg">{profile.location}</span>
              </li>
            </ul>

            <SocialLinks variant="pill" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="col-span-12 lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyText(profile.email);
    if (!ok) {
      showToast("Couldn't copy. Select the address manually.");
      return;
    }
    setCopied(true);
    showToast("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <MagneticButton variant="primary" onClick={onCopy} ariaLabel={`Copy email address ${profile.email}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "idle"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
            {copied ? "Copied!" : "Copy email"}
          </motion.span>
        </AnimatePresence>
      </MagneticButton>
      <a
        href={`mailto:${profile.email}`}
        data-cursor="hover"
        className="font-mono text-sm text-fg underline decoration-fg/20 underline-offset-4 transition-colors hover:text-accent-a hover:decoration-accent-a"
      >
        {profile.email}
      </a>
    </div>
  );
}
