"use client";

import { useState } from "react";
import { siteConfig, projects } from "@/lib/constants";
import MatrixRain from "@/components/ui/MatrixRain";

export default function Footer() {
  const year = new Date().getFullYear();
  const [matrixActive, setMatrixActive] = useState(false);

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#home" className="transition-colors hover:text-foreground">Home</a></li>
              <li><a href="/#about" className="transition-colors hover:text-foreground">About</a></li>
              <li><a href="/#projects" className="transition-colors hover:text-foreground">Projects</a></li>
              <li><a href="/#skills" className="transition-colors hover:text-foreground">Skills</a></li>
              <li><a href="/blog" className="transition-colors hover:text-foreground">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Projects</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {projects.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                  GitHub
                </a>
              </li>
              <li>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.links.email} className="transition-colors hover:text-foreground">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, Three.js &amp; GSAP</p>
          <p className="mt-1">&copy; {year} M.S — {siteConfig.name}. All rights reserved.</p>
          <button
            onClick={() => setMatrixActive(true)}
            disabled={matrixActive}
            className="group mt-6 inline-flex items-center gap-3 rounded-full border-2 border-[#8B5CF6] bg-[#8B5CF6]/10 px-8 py-4 text-base font-semibold text-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300 hover:scale-105 hover:bg-[#8B5CF6] hover:text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95 disabled:opacity-50 btn-pulse"
          >
            <span className="text-lg transition-transform duration-300 group-hover:-translate-y-1">&uarr;</span>
            <span>Take Me Back Up</span>
          </button>
        </div>
      </div>

      <MatrixRain
        active={matrixActive}
        onComplete={() => setMatrixActive(false)}
      />
    </footer>
  );
}
