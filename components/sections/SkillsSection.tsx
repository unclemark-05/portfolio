"use client";

import { useEffect, useRef } from "react";
import { skills, skillCategories } from "@/lib/constants";
import SkillBadge from "@/components/ui/SkillBadge";
import { scrollStaggerFadeIn } from "@/lib/animations";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      scrollStaggerFadeIn(
        sectionRef.current,
        ".skill-item",
        { stagger: 0.05 }
      );
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Skills
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Tech stack</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <div key={skill.name} className="skill-item opacity-0">
                      <SkillBadge skill={skill} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
