"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Branded loading screen (Figma 329:713): full-viewport purple curtain with
 * the centered logo. Once the page has loaded (with a minimum display time so
 * it never flashes), the logo slides up and out first, then the curtain
 * follows, revealing the app from the bottom — easings taken from the Figma
 * motion spec. Renders in the initial server HTML so content is covered
 * before hydration.
 */
const MIN_VISIBLE_MS = 900;
const MAX_WAIT_MS = 4000;
const EXIT_DURATION_MS = 1600;

type Phase = "loading" | "exiting" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let finished = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (reduced) {
        // Skip the slide animation entirely: remove the splash immediately.
        document.documentElement.classList.remove("preloading");
        exitTimer = setTimeout(() => setPhase("done"), 0);
        return;
      }
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      exitTimer = setTimeout(() => setPhase("exiting"), remaining);
    };

    if (reduced || document.readyState === "complete") finish();
    else window.addEventListener("load", finish);
    const maxTimer = setTimeout(finish, MAX_WAIT_MS);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(maxTimer);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, []);

  // Lock scrolling while the splash covers the page.
  useEffect(() => {
    if (phase !== "loading") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    // Release the held entrance animations as the curtain starts lifting.
    document.documentElement.classList.remove("preloading");
    const timer = setTimeout(() => setPhase("done"), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <div id="preloader" aria-hidden className="fixed inset-0 z-[100]">
      {/* Purple curtain — follows the logo up, revealing the page from the bottom */}
      <div
        className={`absolute inset-0 bg-brand transition-transform duration-[1500ms] ease-[cubic-bezier(0.26,0,0,1)] ${
          exiting ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      {/* Logo — exits first, slightly ahead of the curtain */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.28,0.01,0,0.98)] ${
          exiting ? "-translate-y-[80vh]" : "translate-y-0"
        }`}
      >
        <Image
          src="/images/logo.png"
          alt=""
          width={447}
          height={188}
          priority
          className="w-[280px] max-w-[70vw] lg:w-[447px]"
        />
      </div>
    </div>
  );
}
