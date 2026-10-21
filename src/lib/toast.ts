/** Fire-and-forget toast: any client code can call showToast("Copied!"). */
export const TOAST_EVENT = "app:toast";

export function showToast(message: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

export const OPEN_PALETTE_EVENT = "app:open-palette";

export function openPalette(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}
