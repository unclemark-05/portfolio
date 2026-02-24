export const siteConfig = {
  name: "Your Name",
  title: "Full-Stack Developer",
  description:
    "I build web applications that solve real problems. Full-Stack Developer specializing in Next.js, React, and interactive 3D experiences.",
  url: "https://yourportfolio.com",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:your@email.com",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  liveUrl: string;
  features: string[];
  image: string;
  color: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: "opiro",
    name: "Opiro",
    description: "Direct-to-fan music platform",
    longDescription:
      "A direct-to-fan music platform where artists keep 85% of revenue. Features music discovery, artist dashboards, and personal libraries.",
    tech: ["Next.js", "Supabase", "TanStack Query", "PWA", "TypeScript"],
    liveUrl: "https://www.opiro.store",
    features: [
      "Artist dashboard",
      "Music streaming",
      "Direct fan support",
      "85% artist revenue",
    ],
    image: "/images/opiro-screenshot.png",
    color: "#8B5CF6",
    accent: "violet",
  },
  {
    id: "scripture-call",
    name: "Scripture Call",
    description: "Daily Bible verse delivery service",
    longDescription:
      "An automated daily Bible verse delivery service via phone calls. Users choose their preferred time and receive personalized scripture.",
    tech: ["Next.js", "Tailwind CSS", "Schema.org SEO"],
    liveUrl: "https://www.scripturecall.com",
    features: [
      "12 Bible topic categories",
      "Reading plans",
      "Full KJV Bible",
      "Daily calls",
    ],
    image: "/images/scripture-screenshot.png",
    color: "#D4AF37",
    accent: "amber",
  },
  {
    id: "spareroom",
    name: "SpareRoom Nigeria",
    description: "Room rental marketplace for Lagos",
    longDescription:
      "A room rental marketplace for Lagos with BVN verification, escrow payments, and 500+ verified rooms across 19+ neighborhoods.",
    tech: ["Next.js", "Tailwind CSS", "Paystack", "React"],
    liveUrl: "https://www.spareroomnigeria.com",
    features: [
      "BVN verification",
      "Paystack escrow",
      "Monthly license agreements",
      "500+ rooms",
    ],
    image: "/images/spareroom-screenshot.png",
    color: "#3B82F6",
    accent: "blue",
  },
];

export interface Skill {
  name: string;
  category: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "HTML/CSS", category: "Frontend" },
  // Backend
  { name: "Supabase", category: "Backend" },
  { name: "Firebase", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  // 3D & Animation
  { name: "Three.js", category: "3D & Animation" },
  { name: "React Three Fiber", category: "3D & Animation" },
  { name: "GSAP", category: "3D & Animation" },
  // Tools
  { name: "Git", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Paystack", category: "Tools" },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "3D & Animation",
  "Tools",
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Exceptional developer who delivered our music platform ahead of schedule. The attention to detail and user experience was outstanding.",
    name: "Alex Johnson",
    role: "CEO",
    company: "Opiro",
  },
  {
    quote:
      "Built a beautiful, fast, and reliable platform. Their expertise in Next.js and modern web technologies made all the difference.",
    name: "Sarah Chen",
    role: "Product Manager",
    company: "Scripture Call",
  },
  {
    quote:
      "Transformed our vision into reality with a sophisticated room rental platform. The BVN verification and escrow system work flawlessly.",
    name: "Emeka Obi",
    role: "Founder",
    company: "SpareRoom Nigeria",
  },
];

export const stats = [
  { label: "Products Shipped", value: "3" },
  { label: "Users Served", value: "1000+" },
  { label: "Years Experience", value: "3+" },
];
