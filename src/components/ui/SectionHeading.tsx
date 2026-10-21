import Reveal from "./Reveal";

interface SectionHeadingProps {
  /** Two-digit index, e.g. "02". */
  index: string;
  /** Lowercase mono label, e.g. "projects". */
  label: string;
  title: string;
  intro: string;
}

/** Eyebrow (`// 02 — projects`) + bold heading + one-line intro. */
export default function SectionHeading({ index, label, title, intro }: SectionHeadingProps) {
  return (
    <header className="mb-8 max-w-2xl md:mb-10">
      <Reveal>
        <p className="font-mono text-xs tracking-wide text-muted">
          <span className="text-accent-a">{"//"}</span> {index} — {label}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg md:text-6xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{intro}</p>
      </Reveal>
    </header>
  );
}
