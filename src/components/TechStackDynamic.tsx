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
  SiHtml5, 
  SiCss3, 
  SiC 
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
  { name: 'React', icon: FaReact, color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000', category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Language' },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', category: 'Language' },
  { name: 'Java', icon: FaJava, color: '#ED8B00', category: 'Language' },
  { name: 'C', icon: SiC, color: '#A8B9CC', category: 'Language' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'Backend' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032', category: 'Tools' },
  { name: 'GitHub', icon: FaGithub, color: '#181717', category: 'Tools' },
  { name: 'HTML', icon: SiHtml5, color: '#E34F26', category: 'Frontend' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6', category: 'Frontend' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
];

export default function TechStackDynamic() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Language', 'Tools'];
  
  const filteredTech = activeCategory === 'All' 
    ? techStack 
    : techStack.filter(tech => tech.category === activeCategory);

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

      {/* Tech Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTech.map((tech, index) => (
          <div
            key={tech.name}
            className={`
              relative group cursor-pointer
              bg-white dark:bg-slate-800 
              border border-slate-200 dark:border-slate-700
              rounded-xl p-4
              shadow-sm hover:shadow-lg
              transition-all duration-300 ease-out
              ${hoveredIndex === index ? 'scale-105 shadow-xl' : 'scale-100'}
            `}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <TechIcon IconComponent={tech.icon} color={tech.color} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center font-mono">
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
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full font-mono">
                {tech.category}
              </span>
            </div>
          </div>
        ))}
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
