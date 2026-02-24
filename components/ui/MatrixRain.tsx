"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface MatrixRainProps {
  active: boolean;
  onComplete: () => void;
}

const CHARS = "0123456789ABCDEFアイウエオカキクケコサシスセソ@#$%&*+=<>~";
const PURPLE = "#8B5CF6";
const PURPLE_BRIGHT = "#C4B5FD";
const BG = "#0a0a0a";
const FONT_SIZE = 16;

export default function MatrixRain({ active, onComplete }: MatrixRainProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);

  const stopAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  useEffect(() => {
    if (!active) return;

    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    if (!overlay || !canvas) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      window.scrollTo({ top: 0, behavior: "instant" });
      onComplete();
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / FONT_SIZE);
    // Initialize drops at random positions above the screen
    dropsRef.current = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -20)
    );

    // Fade in the overlay
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    // Draw a single frame of rain
    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Bright head character
        ctx.fillStyle = PURPLE_BRIGHT;
        ctx.fillText(char, x, y);

        // Slightly dimmer trail character one step behind
        if (drops[i] > 0) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = PURPLE;
          ctx.fillText(trailChar, x, y - FONT_SIZE);
        }

        // Move drop down
        drops[i]++;

        // Reset drop to top when it goes off screen (with randomness)
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -10);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    // Fill initial background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Start animation loop
    rafRef.current = requestAnimationFrame(draw);

    // After 1.5s, scroll to top
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 1500);

    // After 2s, fade out and complete
    const fadeTimer = setTimeout(() => {
      stopAnimation();
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          onComplete();
        },
      });
    }, 2000);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(fadeTimer);
      stopAnimation();
    };
  }, [active, onComplete, stopAnimation]);

  if (!active) return null;

  return (
    <div ref={overlayRef} className="matrix-overlay" style={{ opacity: 0 }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
