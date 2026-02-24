"use client";

import { projects } from "@/lib/constants";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Projects
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Products I&apos;ve shipped
          </h2>
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
