"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/constants";
import gsap from "gsap";
import TextScramble from "@/components/ui/TextScramble";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  ),
});

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Just show everything immediately
      textRef.current.querySelectorAll(".hero-subtitle, .hero-desc, .hero-tech, .hero-buttons").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Subtitle label: clip-path reveal from left
    tl.fromTo(
      ".hero-subtitle",
      { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power2.inOut" }
    );

    // 2. Name h1 is handled by TextScramble component (starts at 500ms delay)

    // 3. Description: fade-up
    tl.fromTo(
      ".hero-desc",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "+=0.1"
    );

    // 4. Tech stack line: fade-up
    tl.fromTo(
      ".hero-tech",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    // 5. Buttons: fade-up
    tl.fromTo(
      ".hero-buttons",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-4">
        <div
          ref={textRef}
          className="flex flex-col justify-center gap-4 md:gap-6"
        >
          <p className="hero-subtitle text-sm font-medium uppercase tracking-widest text-primary opacity-0">
            Full-Stack Developer
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <TextScramble text={siteConfig.name} delay={500} />
          </h1>
          <p className="hero-desc max-w-md text-lg text-muted-foreground opacity-0 sm:text-xl">
            I build web applications that solve real problems.
          </p>
          <p className="hero-tech text-sm text-muted-foreground opacity-0">
            Next.js &middot; React &middot; TypeScript &middot; 3D
          </p>
          <div className="hero-buttons flex gap-3 pt-2 opacity-0">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="relative h-[350px] sm:h-[400px] md:h-[500px]">
          {isMobile ? (
            <div className="flex h-full items-center justify-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl">
                💻
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10 text-3xl">
                &lt;/&gt;
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">
                ⚙️
              </div>
            </div>
          ) : (
            <HeroScene />
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs">Scroll</span>
          <div className="h-6 w-4 rounded-full border-2 border-muted-foreground/50">
            <div className="mx-auto mt-1 h-1.5 w-1 animate-bounce rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
