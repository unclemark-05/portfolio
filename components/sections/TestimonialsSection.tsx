"use client";

import { useEffect, useRef } from "react";
import { testimonials } from "@/lib/constants";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { scrollStaggerFadeIn } from "@/lib/animations";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      scrollStaggerFadeIn(sectionRef.current, ".testimonial-item", {
        stagger: 0.15,
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            What people say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-item opacity-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
