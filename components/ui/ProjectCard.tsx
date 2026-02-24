"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/constants";
import { scrollSlideIn } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (cardRef.current) {
      scrollSlideIn(cardRef.current, isEven ? "left" : "right");
    }
  }, [isEven]);

  return (
    <div
      ref={cardRef}
      className="opacity-0"
    >
      <div
        className={`grid gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8 md:grid-cols-2 md:items-center ${
          !isEven ? "md:direction-rtl" : ""
        }`}
      >
        {/* Image */}
        <div className={`${!isEven ? "md:order-2" : ""}`}>
          <div
            className="aspect-video overflow-hidden rounded-xl"
            style={{ backgroundColor: `${project.color}15` }}
          >
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div
                  className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <span className="text-2xl font-bold" style={{ color: project.color }}>
                    {project.name[0]}
                  </span>
                </div>
                <p className="text-sm">Screenshot placeholder</p>
                <p className="text-xs text-muted-foreground/60">{project.image}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className={`${!isEven ? "md:order-1" : ""}`}>
          <h3 className="mb-2 text-2xl font-bold">{project.name}</h3>
          <p className="mb-4 text-muted-foreground">{project.longDescription}</p>

          {/* Features */}
          <ul className="mb-4 space-y-1">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            style={{ color: project.color }}
          >
            Visit Live Site
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
