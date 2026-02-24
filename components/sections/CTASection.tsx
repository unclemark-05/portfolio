"use client";

import { useEffect, useRef } from "react";
import { scrollClipReveal, scrollCharReveal } from "@/lib/animations";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      scrollClipReveal(sectionRef.current);
    }
    if (headingRef.current) {
      scrollCharReveal(headingRef.current);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28"
      style={{ clipPath: "inset(100% 0% 0% 0%)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="animated-gradient rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 text-center sm:p-12">
          <div className="overflow-hidden">
            <h2 ref={headingRef} className="mb-4 text-3xl font-bold sm:text-4xl">
              Have a project in mind?
            </h2>
          </div>
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <a
            href="/contact"
            className="btn-pulse inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-transform hover:scale-105"
          >
            Let&apos;s Talk
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
