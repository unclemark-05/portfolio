import type { Skill } from "@/lib/constants";

interface SkillBadgeProps {
  skill: Skill;
}

const categoryColors: Record<string, string> = {
  Frontend: "border-violet-500/30 bg-violet-500/5 text-violet-400",
  Backend: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  "3D & Animation": "border-amber-500/30 bg-amber-500/5 text-amber-400",
  Tools: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
};

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-center text-sm font-medium transition-transform hover:scale-105 ${
        categoryColors[skill.category] || "border-border bg-card"
      }`}
    >
      {skill.name}
    </div>
  );
}
