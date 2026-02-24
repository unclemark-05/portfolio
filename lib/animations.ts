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

// --- New animation utilities ---

export function scrollClipReveal(
  element: string | Element,
  options?: {
    trigger?: string | Element;
    duration?: number;
    delay?: number;
  }
) {
  return gsap.fromTo(
    element,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: (options?.trigger as gsap.DOMTarget) ?? (element as gsap.DOMTarget),
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function scrollCharReveal(
  element: Element,
  options?: { stagger?: number; duration?: number }
) {
  const text = element.textContent || "";
  element.textContent = "";
  element.setAttribute("aria-label", text);

  const chars = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(100%)";
    span.setAttribute("aria-hidden", "true");
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: options?.duration ?? 0.5,
    stagger: options?.stagger ?? 0.02,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

export function scrollCountUp(
  element: Element,
  options?: { duration?: number; suffix?: string }
) {
  const raw = element.textContent || "0";
  const numericPart = parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = options?.suffix ?? raw.replace(/[0-9]/g, "");

  const obj = { val: 0 };
  return gsap.to(obj, {
    val: numericPart,
    duration: options?.duration ?? 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    onUpdate() {
      element.textContent = Math.round(obj.val) + suffix;
    },
  });
}

export function scrollScaleIn(
  element: string | Element,
  options?: {
    trigger?: string | Element;
    duration?: number;
  }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8, rotation: -3 },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: options?.duration ?? 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: (options?.trigger as gsap.DOMTarget) ?? (element as gsap.DOMTarget),
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}
