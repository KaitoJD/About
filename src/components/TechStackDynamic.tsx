'use client';

import React, { useState } from 'react';
// Import icons from React Icons
import { 
  FaReact, 
  FaJs, 
  FaGitAlt, 
  FaGithub, 
  FaNodeJs, 
  FaJava
} from 'react-icons/fa';

import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiCplusplus
} from 'react-icons/si';

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  category: string;
}

// Helper component to standardize icon styling
const TechIcon = ({ 
  IconComponent, 
  color 
}: { 
  IconComponent: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; 
  color: string 
}) => (
  <IconComponent className="w-8 h-8" style={{ color }} />
);

const techStack: TechItem[] = [
  // Programming Languages
  { name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'Language' },
  { name: 'Java', icon: FaJava, color: '#ED8B00', category: 'Language' },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', category: 'Language' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Language' },
  
  // Frontend Technologies
  { name: 'React', icon: FaReact, color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000', category: 'Frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
  
  // Backend & Runtime
  { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'Backend' },
  
  // Version Control
  { name: 'Git', icon: FaGitAlt, color: '#F05032', category: 'Tools' },
  { name: 'GitHub', icon: FaGithub, color: '#181717', category: 'Tools' },
];

export default function TechStackDynamic() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isScrollHintHovered, setIsScrollHintHovered] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const categories = ['All', 'Language', 'Frontend', 'Backend', 'Tools'];
  
  const filteredTech = activeCategory === 'All' 
    ? techStack 
    : techStack.filter(tech => tech.category === activeCategory);

  // Scroll to top when category changes
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="w-full space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
              activeCategory === category
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tech Grid - Vertical Scrollable */}
      <div className="w-full">
        <div 
          ref={scrollContainerRef}
          className={`overflow-y-auto tech-scroll-container max-h-96 p-4 rounded-xl border-2 transition-all duration-500 ${
            isScrollHintHovered 
              ? 'border-emerald-400 shadow-lg shadow-emerald-400/50 dark:border-emerald-500 dark:shadow-emerald-500/50' 
              : 'border-transparent'
          }`}
          role="region"
          aria-label="Technology stack"
          tabIndex={0}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-4">
            {filteredTech.map((tech, index) => (
              <div
                key={tech.name}
                className={`
                  relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800
                  bg-white dark:bg-slate-800 
                  border border-slate-200 dark:border-slate-700
                  rounded-xl p-4 sm:p-5 md:p-6
                  shadow-sm hover:shadow-lg
                  transition-all duration-300 ease-out
                  m-2
                  ${hoveredIndex === index ? 'scale-105 shadow-xl' : 'scale-100'}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                tabIndex={0}
                role="button"
                aria-label={`${tech.name} - ${tech.category} technology`}
              >
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  <div className="transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                    <TechIcon IconComponent={tech.icon} color={tech.color} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 text-center font-mono leading-tight">
                    {tech.name}
                  </span>
                </div>
                
                {/* Subtle hover border effect */}
                <div 
                  className={`
                    absolute inset-0 rounded-xl border-2 transition-all duration-300
                    ${hoveredIndex === index 
                      ? 'border-emerald-400 dark:border-emerald-500' 
                      : 'border-transparent'
                    }
                  `}
                />
                
                {/* Category badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                  <span className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full font-mono whitespace-nowrap">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p 
            className="text-sm text-slate-500 dark:text-slate-400 font-mono flex items-center justify-center space-x-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300"
            onMouseEnter={() => setIsScrollHintHovered(true)}
            onMouseLeave={() => setIsScrollHintHovered(false)}
          >
            <svg className="w-4 h-4 rotate-90 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Scroll to explore all technologies</span>
            <svg className="w-4 h-4 rotate-90 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m0-4H3" />
            </svg>
          </p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="text-center pt-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
          Showing {filteredTech.length} technologies {activeCategory !== 'All' && `in ${activeCategory}`}
        </p>
      </div>
    </div>
  );
}
