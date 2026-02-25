"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/constants";
import gsap from "gsap";
import { usePortfolioStore } from "@/lib/portfolioStore";

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
  const preloaderDone = usePortfolioStore((s) => s.preloaderDone);
  const animated = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Master GSAP timeline — triggered when preloader finishes
  useEffect(() => {
    if (!preloaderDone || !textRef.current || animated.current) return;
    animated.current = true;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      textRef.current
        .querySelectorAll(
          ".hero-subtitle, .hero-char, .hero-desc, .hero-tech, .hero-buttons, .hero-scroll"
        )
        .forEach((el) => {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "none";
        });
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });

    // 1. Tagline: tracking-in animation (letter-spacing wide→normal + fade)
    tl.fromTo(
      ".hero-subtitle",
      { letterSpacing: "0.5em", opacity: 0 },
      { letterSpacing: "0.1em", opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // 2. Name: each character clip-path reveal from bottom with stagger + scale overshoot
    tl.fromTo(
      ".hero-char",
      { yPercent: 100, opacity: 0, scale: 1.2 },
      {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.06,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // 3. Description: fade up
    tl.fromTo(
      ".hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // 4. Tech stack: fade up
    tl.fromTo(
      ".hero-tech",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // 5. Buttons: fade up
    tl.fromTo(
      ".hero-buttons",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    // 6. Scroll indicator: fade in + infinite bounce
    tl.fromTo(
      ".hero-scroll",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );

    tl.to(".hero-scroll", {
      y: 8,
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tl.kill();
    };
  }, [preloaderDone]);

  // Split name into characters for individual animation
  const nameChars = siteConfig.name.split("").map((char, i) => (
    <span key={i} className="char-reveal-wrapper">
      <span className="char-reveal hero-char">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));

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
            {nameChars}
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
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg shadow-primary/10">
                <span className="text-4xl font-black tracking-tight text-primary">M.S</span>
              </div>
              <div className="flex gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-400">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" />
                  </svg>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                    <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <HeroScene />
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs">Scroll</span>
          <div className="h-6 w-4 rounded-full border-2 border-muted-foreground/50">
            <div className="mx-auto mt-1 h-1.5 w-1 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
