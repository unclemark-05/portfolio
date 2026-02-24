import type { Testimonial } from "@/lib/constants";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group glow-card flex h-full flex-col rounded-xl border border-border bg-card p-6">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mb-4 text-primary/30 transition-all duration-300 group-hover:scale-125 group-hover:text-primary/50"
      >
        <path d="M11.3 2.5c-1.8 1-3.2 2.2-4.2 3.6C6 7.5 5.5 9.1 5.5 11c0 .3 0 .6.1.9.4-.3.9-.4 1.4-.4 1.7 0 3 1.3 3 3s-1.3 3-3 3c-1.1 0-2-.5-2.6-1.3C3.5 15.2 3 14 3 12.5c0-2.6.9-4.8 2.6-6.8C7.3 3.8 9.2 2.7 11.3 2v.5zm10 0c-1.8 1-3.2 2.2-4.2 3.6-1.1 1.4-1.6 3-1.6 4.9 0 .3 0 .6.1.9.4-.3.9-.4 1.4-.4 1.7 0 3 1.3 3 3s-1.3 3-3 3c-1.1 0-2-.5-2.6-1.3-.9-1-1.4-2.2-1.4-3.7 0-2.6.9-4.8 2.6-6.8C17.3 3.8 19.2 2.7 21.3 2v.5z" />
      </svg>
      <p className="mb-4 flex-grow text-muted-foreground">{testimonial.quote}</p>
      <div>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">
          {testimonial.role}
          {testimonial.company && `, ${testimonial.company}`}
        </p>
      </div>
    </div>
  );
}
