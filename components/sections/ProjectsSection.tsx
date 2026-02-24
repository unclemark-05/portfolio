"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/constants";
import ProjectCard from "@/components/ui/ProjectCard";
import { scrollCharReveal } from "@/lib/animations";

export default function ProjectsSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      scrollCharReveal(headingRef.current);
    }
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Projects
          </p>
          <div className="overflow-hidden">
            <h2 ref={headingRef} className="text-3xl font-bold sm:text-4xl">
              Products I&apos;ve shipped
            </h2>
          </div>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Real applications solving real problems — from music platforms to
            rental marketplaces.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
