"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/lib/constants";
import { scrollFadeInUp, scrollSlideIn, scrollCountUp } from "@/lib/animations";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const photo = sectionRef.current.querySelector(".about-photo");
    const text = sectionRef.current.querySelector(".about-text");
    if (photo) scrollSlideIn(photo, "left", { trigger: photo });
    if (text) scrollFadeInUp(text, { trigger: text });

    // Count-up animation for stat values
    statRefs.current.forEach((el) => {
      if (el) scrollCountUp(el);
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Profile photo */}
          <div className="about-photo opacity-0">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20" style={{ aspectRatio: "3/4" }}>
              <img
                src="/images/profile.jpg"
                alt="Mosope Salami"
                className="h-full w-full object-cover"
              />
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
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-card p-4 text-center"
                >
                  <p
                    ref={(el) => { statRefs.current[i] = el; }}
                    className="text-2xl font-bold text-primary"
                  >
                    {stat.value}
                  </p>
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
