import type { SkillRating } from '@/types';

interface SkillDotsProps {
  skill: SkillRating;
}

const dotColors: Record<string, string> = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
};

export default function SkillDots({ skill }: SkillDotsProps) {
  const filledColor = dotColors[skill.color] ?? 'bg-emerald-500';

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
      <div className="flex space-x-1">
        {Array.from({ length: skill.total }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < skill.filled ? filledColor : 'bg-slate-300 dark:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
