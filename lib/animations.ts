"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function fadeInUp(
  element: string | Element,
  options?: { delay?: number; duration?: number; y?: number }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: options?.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: "power2.out",
    }
  );
}

export function staggerFadeInUp(
  elements: string | Element[],
  options?: { stagger?: number; delay?: number; duration?: number }
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      stagger: options?.stagger ?? 0.1,
      delay: options?.delay ?? 0,
      ease: "power2.out",
    }
  );
}

export function scrollFadeInUp(
  element: string | Element,
  options?: {
    trigger?: string | Element;
    start?: string;
    delay?: number;
    duration?: number;
  }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: (options?.trigger as gsap.DOMTarget) ?? (element as gsap.DOMTarget),
        start: options?.start ?? "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function scrollSlideIn(
  element: string | Element,
  direction: "left" | "right" = "left",
  options?: { trigger?: string | Element; duration?: number }
) {
  const x = direction === "left" ? -80 : 80;
  return gsap.fromTo(
    element,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: (options?.trigger as gsap.DOMTarget) ?? (element as gsap.DOMTarget),
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function scrollStaggerFadeIn(
  container: string | Element,
  children: string,
  options?: { stagger?: number; duration?: number }
) {
  return gsap.fromTo(
    children,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.6,
      stagger: options?.stagger ?? 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container as gsap.DOMTarget,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}
