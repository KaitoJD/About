import type { TimelineEntry } from '@/types';

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
}

// Map accent color names to Tailwind classes
const accentColors: Record<string, { text: string; borderSide: string }> = {
  purple: {
    text: 'text-purple-600 dark:text-purple-400',
    borderSide: 'border-r-4 border-purple-600 dark:border-purple-400',
  },
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-400',
    borderSide: 'border-emerald-600 dark:border-emerald-400',
  },
  blue: {
    text: 'text-blue-600 dark:text-blue-400',
    borderSide: 'border-blue-600 dark:border-blue-400',
  },
  orange: {
    text: 'text-orange-600 dark:text-orange-400',
    borderSide: 'border-orange-600 dark:border-orange-400',
  },
  pink: {
    text: 'text-pink-600 dark:text-pink-400',
    borderSide: 'border-pink-600 dark:border-pink-400',
  },
};

const tagColors: Record<string, string> = {
  purple: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700',
  emerald: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700',
  indigo: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-700',
  violet: 'bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 border-violet-200 dark:border-violet-700',
};

export default function TimelineItem({ entry }: TimelineItemProps) {
  const isLeft = entry.side === 'left';
  const accent = accentColors[entry.accentColor] ?? accentColors.emerald;

  const cardBorder = isLeft
    ? `border-r-4 ${accent.borderSide}`
    : `border-l-4 ${accent.borderSide}`;

  return (
    <div className="relative">
      {/* Branch line */}
      {isLeft ? (
        <div className="hidden sm:block absolute right-1/2 top-8 w-8 md:w-12 lg:w-16 xl:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400 z-0" />
      ) : (
        <div className="hidden sm:block absolute left-1/2 top-8 w-8 md:w-12 lg:w-16 xl:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400 z-0" />
      )}

      {/* Junction dot */}
      <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-0" />

      <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
        <div
          className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
            isLeft
              ? 'mr-auto pr-4 sm:pr-12 md:pr-16 lg:pr-20 xl:pr-28'
              : 'ml-auto pl-4 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-28'
          }`}
        >
          <div className={`relative z-10 bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${cardBorder}`}>
            <div className={`${accent.text} font-semibold text-xs sm:text-sm mb-2`}>{entry.year}</div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
              {entry.title}
            </h3>
            <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              {entry.items.map((item, i) => (
                <p key={i}>• {item}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
              {entry.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`${tagColors[tag.colorClass] ?? tagColors.indigo} px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
