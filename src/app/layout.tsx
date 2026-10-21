import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import CommandPalette from "@/components/layout/CommandPalette";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/layout/Providers";
import CustomCursor from "@/components/effects/CustomCursor";
import PageBackground from "@/components/effects/PageBackground";
import Preloader from "@/components/effects/Preloader";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Toaster from "@/components/ui/Toaster";
import { profile } from "@/data/profile";
import "./globals.css";

const space = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--f-space" });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--f-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--f-jb" });

const title = "Harshit Gupta — Software Developer | Computer Science (AIML)";
const description =
  "Harshit Gupta's portfolio. I'm a B.Tech Computer Science (AIML) student in Ghaziabad, India, and this is where you'll find my full-stack projects, problem-solving practice and leadership experience.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name }],
  keywords: ["Harshit Gupta", "Software Developer", "React", "Node.js", "Python", "AIML", "Portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: `${profile.name} — Portfolio`,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0b0a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f1e9" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Ghaziabad", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "ABES Engineering College" },
  sameAs: [
    "https://github.com/harshit3003",
    "https://www.linkedin.com/in/harshitgupta0001",
    "https://leetcode.com/u/harshit_3003/",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${space.variable} ${inter.variable} ${mono.variable}`}>
      <body className="grain min-h-svh bg-bg font-sans text-fg antialiased">
        {/* If JS is off, never leave reveal-animated content invisible. */}
        <noscript>
          <style>{`[data-reveal],[style*="opacity"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <a
          href="#main"
          className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>

        <Providers>
          <PageBackground />
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <CommandPalette />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
