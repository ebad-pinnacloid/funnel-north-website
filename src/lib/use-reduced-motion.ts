"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Whether the reader prefers reduced motion, as a render-time value so scroll
 * stories can drop their pinned stage entirely rather than pin over nothing.
 * Read through an external store (not effect state) so it is settled on the
 * first client render and stays in sync if the preference changes.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
