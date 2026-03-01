import type { TechItem } from '@/types';

import {
  FaReact,
  FaJs,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaJava,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiCplusplus,
} from 'react-icons/si';

export const techStack: TechItem[] = [
  { name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'Language' },
  { name: 'Java', icon: FaJava, color: '#ED8B00', category: 'Language' },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', category: 'Language' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Language' },

  { name: 'React', icon: FaReact, color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000', category: 'Frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },

  { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'Backend' },

  { name: 'Git', icon: FaGitAlt, color: '#F05032', category: 'Tools' },
  { name: 'GitHub', icon: FaGithub, color: '#181717', category: 'Tools' },
];

export const techCategories = ['All', 'Language', 'Frontend', 'Backend', 'Tools'];
