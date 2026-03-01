import TechStackDynamic from '@/components/TechStackDynamic';
import SkillDots from '@/components/ui/SkillDots';
import { skillGroups, personalTraits, learningItems, funFacts } from '@/data/skills';

const traitColors: Record<string, string> = {
  emerald: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
  blue: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  orange: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
  pink: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
};

const traitDotColors: Record<string, string> = {
  emerald: 'bg-emerald-600',
  blue: 'bg-blue-600',
  orange: 'bg-orange-600',
  pink: 'bg-pink-600',
};

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ease-out">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
            About Me
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-emerald-600 mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Passionate about crafting digital experiences that make a difference
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 transition-all duration-1000 ease-out delay-300">
          {/* Left column - Personal Story */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-6 sm:p-8 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                Who I Am
              </h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Hello! I&apos;m <span className="font-semibold text-emerald-600 dark:text-emerald-400">Nguyen Sy Nguyen</span>,
                a passionate Software Engineering student at <span className="font-semibold">FPT University</span> with
                a deep love for creating innovative digital solutions that solve real-world problems.
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                My journey in technology began with a curiosity about how things work, which evolved into a passion
                for building them. From winning provincial physics competitions to managing developer communities,
                I&apos;ve always been driven by the desire to learn, create, and share knowledge.
              </p>
            </div>

            {/* Skills */}
            <div className="grid sm:grid-cols-2 gap-6">
              {skillGroups.map((group) => (
                <div key={group.title} className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    {group.icon === 'code' ? (
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {group.title}
                  </h4>
                  <div className="space-y-3">
                    {group.skills.map((skill) => (
                      <SkillDots key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Traits */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {personalTraits.map((trait) => (
                <span
                  key={trait.label}
                  className={`${traitColors[trait.colorClass] ?? traitColors.emerald} px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center`}
                >
                  <span className={`w-2 h-2 ${traitDotColors[trait.colorClass] ?? traitDotColors.emerald} rounded-full mr-2`} />
                  {trait.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column - Tech & Extras */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tech Stack */}
            <div className="bg-slate-50 dark:bg-slate-700 p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Tech Stack &amp; Tools
              </h3>
              <TechStackDynamic />
            </div>

            {/* Currently Learning */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Currently Learning
              </h4>
              <div className="space-y-2">
                {learningItems.map((item) => (
                  <div key={item.text} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <span className={`w-2 h-2 ${item.dotColor} rounded-full mr-3`} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fun Facts
              </h4>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {funFacts.map((fact) => (
                  <p key={fact}>{fact}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
