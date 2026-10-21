import type { CSSProperties } from "react";

interface MarqueeProps {
  items: readonly string[];
  /** Run right-to-left (default) or reverse. */
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  label: string;
}

/**
 * Infinite chip marquee. Pure CSS animation (no JS cost), pauses on hover,
 * and stops entirely under prefers-reduced-motion (see globals.css).
 */
export default function Marquee({ items, reverse = false, duration = 36, label }: MarqueeProps) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-direction": reverse ? "reverse" : "normal",
  } as CSSProperties;

  // Two identical halves → translating by -50% loops seamlessly.
  const half = [...items, ...items];

  return (
    <div
      className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      role="group"
      aria-label={label}
    >
      <div className="marquee-track flex w-max gap-3 py-2" style={style}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1}>
            {half.map((item, i) => (
              <li
                key={`${copy}-${i}`}
                className="glass rounded-full! px-5 py-2.5 font-mono text-sm text-fg"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
