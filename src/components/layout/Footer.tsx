import { profile } from "@/data/profile";
import BackToTop from "./BackToTop";

/** Minimal footer: credit line + back-to-top. */
export default function Footer() {
  return (
    <footer className="border-t border-fg/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {profile.name} · Designed and coded by me, using Next.js
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
