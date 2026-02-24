"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/lib/constants";
import { scrollFadeInUp, scrollSlideIn } from "@/lib/animations";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const photo = sectionRef.current.querySelector(".about-photo");
    const text = sectionRef.current.querySelector(".about-text");
    if (photo) scrollSlideIn(photo, "left", { trigger: photo });
    if (text) scrollFadeInUp(text, { trigger: text });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Photo placeholder */}
          <div className="about-photo opacity-0">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <p className="text-sm">Add your photo</p>
                  <p className="text-xs text-muted-foreground/60">public/images/profile.jpg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="about-text opacity-0">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              About Me
            </p>
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Building digital products that matter
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a Full-Stack Developer passionate about creating web applications
                that solve real-world problems. With expertise in Next.js, React, and
                modern web technologies, I help businesses and startups bring their
                ideas to life.
              </p>
              <p>
                From music platforms to faith-based apps to real estate marketplaces,
                I&apos;ve shipped products that serve real users. I care about
                performance, user experience, and writing clean, maintainable code.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-card p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
