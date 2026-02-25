"use client";

import { usePortfolioStore } from "@/lib/portfolioStore";

export default function ScrollProgress() {
  const progress = usePortfolioStore((s) => s.scrollProgress);

  return (
    <div className="fixed top-0 left-0 z-[51] h-0.5 w-full">
      <div
        className="h-full transition-[width] duration-150"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, var(--primary), var(--accent))",
        }}
      />
    </div>
  );
}
