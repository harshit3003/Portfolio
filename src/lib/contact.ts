import { profile } from "@/data/profile";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactResult = { ok: true; via: "mailto" | "api" } | { ok: false; error: string };

/**
 * Contact submission hook.
 *
 * Today: opens the visitor's mail client with a pre-filled message (mailto: fallback).
 * Later: to use a real backend, add `src/app/api/contact/route.ts` and replace the body of
 * this function with:
 *
 *   const res = await fetch("/api/contact", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   return res.ok ? { ok: true, via: "api" } : { ok: false, error: "Could not send message." };
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
  const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  return { ok: true, via: "mailto" };
}
