"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { createContext, useContext, useState, type ReactNode } from "react";
import SmoothScroll from "@/components/effects/SmoothScroll";

/** `ready` flips true when the preloader finishes; the hero entrance waits for it. */
const ReadyContext = createContext<{ ready: boolean; setReady: (v: boolean) => void }>({
  ready: false,
  setReady: () => {},
});

export const useReady = () => useContext(ReadyContext);

export default function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {/* reducedMotion="user" makes every Framer transform/layout animation honour the OS setting. */}
      <MotionConfig reducedMotion="user">
        <ReadyContext.Provider value={{ ready, setReady }}>
          <SmoothScroll />
          {children}
        </ReadyContext.Provider>
      </MotionConfig>
    </ThemeProvider>
  );
}
