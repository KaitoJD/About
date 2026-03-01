import TimelineItem from '@/components/ui/TimelineItem';
import { timelineEntries } from '@/data/timeline';

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ease-out">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
            My Journey
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-emerald-600 mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A timeline of my achievements, experiences, and milestones.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto transition-all duration-1000 ease-out delay-300">
          {/* Main trunk */}
          <div
            className="absolute left-1/2 top-0 h-[calc(100%-100px)] w-1 bg-emerald-600 dark:bg-emerald-400 transform -translate-x-1/2 z-0"
          />

          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {timelineEntries.map((entry, index) => (
              <TimelineItem key={`${entry.year}-${entry.title}`} entry={entry} index={index} />
            ))}

            {/* Root / Origin point */}
            <div className="relative">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 text-white p-3 sm:p-4 rounded-full shadow-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-center mt-3 sm:mt-4">
                <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">The Beginning</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">My journey starts here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
