"use client";

import { navLinks } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <nav className="absolute right-0 top-0 flex h-full w-64 flex-col gap-2 bg-card p-6 pt-20 shadow-xl">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-muted"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
