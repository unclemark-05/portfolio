"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollProgress, setScrollDirection } from "@/lib/portfolioStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip if user prefers reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
    });
    lenisRef.current = lenis;

    // Bridge Lenis to GSAP ScrollTrigger + update store
    lenis.on("scroll", () => {
      ScrollTrigger.update();
      setScrollProgress(lenis.progress ?? 0);
      setScrollDirection(lenis.direction >= 0 ? "down" : "up");
    });

    // Use GSAP ticker for shared RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
