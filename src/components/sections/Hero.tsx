"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowRight, Command, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { useReady } from "@/components/layout/Providers";
import MagneticButton from "@/components/ui/MagneticButton";
import SocialLinks from "@/components/ui/SocialLinks";
import TiltCard from "@/components/ui/TiltCard";
import { profile } from "@/data/profile";
import { EASE, fadeUp, maskWord, staggerContainer } from "@/lib/motion";
import { openPalette } from "@/lib/toast";

// Heavy-ish canvas effect: loaded on the client only, after first paint.
const Aurora = dynamic(() => import("@/components/effects/Aurora"), { ssr: false });

export default function Hero() {
  const { ready } = useReady();
  const reduce = useReducedMotion();

  // Pointer position (px, relative to hero) drives the spotlight; normalised (-.5….5) drives parallax.
  const px = useMotionValue(-999);
  const py = useMotionValue(-999);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const snx = useSpring(nx, { stiffness: 60, damping: 18 });
  const sny = useSpring(ny, { stiffness: 60, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${px}px ${py}px, rgb(var(--glow) / 0.14), transparent 65%)`;

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  };

  const state = ready ? "show" : "hidden";

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-10 pt-28 md:pt-32"
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <Aurora />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <FloatingShape nx={snx} ny={sny} depth={46} className="left-[6%] top-[22%] size-24 rounded-full border border-accent-a/30" />
        <FloatingShape nx={snx} ny={sny} depth={-70} className="right-[8%] top-[14%] size-16 rotate-12 rounded-2xl border border-accent-b/30" />
        <FloatingShape nx={snx} ny={sny} depth={90} className="bottom-[18%] left-[44%] size-3 rounded-full bg-accent-b/70 blur-[1px]" />
        <FloatingShape nx={snx} ny={sny} depth={-40} className="bottom-[26%] right-[12%] size-28 rounded-full bg-accent-a/10 blur-2xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-12 items-center gap-y-14 px-6">
        {/* Copy */}
        <motion.div
          className="col-span-12 lg:col-span-7"
          variants={staggerContainer(0.09, 0.05)}
          initial="hidden"
          animate={state}
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 font-mono text-xs text-muted"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-b opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-b" />
            </span>
            <MapPin size={12} aria-hidden /> {profile.location}
          </motion.p>

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            <span className="sr-only">{profile.headline.join(" ")}</span>
            <motion.span aria-hidden className="block" variants={staggerContainer(0.07)}>
              {profile.headline.map((word, i) => (
                <span key={`${word}-${i}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    variants={maskWord}
                    className={
                      word === "full-stack" || word === "products"
                        ? "text-gradient inline-block"
                        : "inline-block"
                    }
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3 font-mono text-sm text-muted sm:text-base">
            <span className="text-accent-a">&gt;</span>
            <RotatingRole roles={profile.roles} />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" variant="primary">
              View projects <ArrowRight size={16} aria-hidden />
            </MagneticButton>
            <MagneticButton href="#contact">Get in touch</MagneticButton>
            <button
              type="button"
              data-cursor="hover"
              onClick={openPalette}
              aria-label="Open command palette"
              className="ml-1 hidden min-h-11 items-center gap-1.5 rounded-full border border-fg/10 px-3.5 font-mono text-xs text-muted transition-colors hover:text-fg sm:inline-flex"
            >
              <Command size={13} aria-hidden /> K
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* Profile card */}
        <motion.div
          className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        >
          <ProfileCard />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        data-cursor="hover"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:flex"
      >
        scroll
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent-b"
        >
          <ArrowDown size={14} aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}

/** Absolutely-positioned decorative shape that drifts opposite/with the pointer. */
function FloatingShape({
  nx,
  ny,
  depth,
  className,
}: {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  depth: number;
  className: string;
}) {
  const x = useTransform(nx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(ny, [-0.5, 0.5], [-depth, depth]);
  return <motion.div className={`absolute ${className}`} style={{ x, y }} />;
}

/** Cycles through roles with a masked slide transition. */
function RotatingRole({ roles }: { roles: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="relative inline-flex h-[1.6em] items-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={roles[i]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="text-fg"
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
        <span className="caret" />
      </span>
    </>
  );
}

function ProfileCard() {
  const [failed, setFailed] = useState(false);

  return (
    <TiltCard max={9} className="relative w-full max-w-sm">
      {/* Glowing ring */}
      <motion.div
        aria-hidden
        className="absolute -inset-[3px] rounded-[30px] opacity-70 blur-md"
        style={{
          background:
            "conic-gradient(from 0deg, rgb(var(--accent-a)), rgb(var(--accent-b)), rgb(var(--accent-a) / 0.15), rgb(var(--accent-a)))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <div className="glass relative rounded-[28px]! p-2.5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-surface-2">
          {failed ? (
            <Monogram />
          ) : (
            <Image
              src="/profile.jpg"
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 384px"
              className="object-cover object-[50%_20%]"
              onError={() => setFailed(true)}
            />
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
            <div className="glass rounded-2xl! px-3.5 py-2 text-white [--border:255_255_255]">
              <p className="font-display text-sm font-semibold">{profile.name}</p>
              <p className="font-mono text-[11px] text-white/75">{profile.role}</p>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/** Styled fallback when /public/profile.jpg is missing. */
function Monogram(): ReactNode {
  return (
    <div role="img" aria-label={`${profile.name} monogram`} className="grid size-full place-items-center">
      <span className="text-gradient font-display text-8xl font-bold tracking-tighter">{profile.initials}</span>
    </div>
  );
}
