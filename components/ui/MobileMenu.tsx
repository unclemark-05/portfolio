"use client";

import { useEffect, useRef } from "react";
import { navLinks } from "@/lib/constants";
import gsap from "gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const links = linksRef.current;
    if (!overlay || !panel || !links) return;

    const linkEls = links.querySelectorAll("a");

    if (isOpen) {
      // Animate open
      gsap.set(overlay, { pointerEvents: "auto" });
      gsap.to(overlay, { opacity: 1, duration: 0.3 });
      gsap.to(panel, { x: 0, duration: 0.4, ease: "power3.out" });
      gsap.fromTo(
        linkEls,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.2 }
      );
    } else {
      // Animate close
      gsap.to(panel, { x: "100%", duration: 0.3, ease: "power2.in" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: "none" });
        },
      });
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-40 md:hidden" style={{ pointerEvents: "none" }}>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60"
        style={{ opacity: 0, pointerEvents: "none" }}
        onClick={onClose}
      />
      <nav
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-64 flex-col gap-2 bg-card p-6 pt-20 shadow-xl"
        style={{ transform: "translateX(100%)" }}
      >
        <div ref={linksRef}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-muted"
              style={{ opacity: 0 }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
