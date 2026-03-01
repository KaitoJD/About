import type { SkillGroup, PersonalTrait, LearningItem } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Development',
    icon: 'code',
    skills: [
      { name: 'Frontend', filled: 3, total: 5, color: 'emerald' },
      { name: 'Backend', filled: 1, total: 5, color: 'blue' },
      { name: 'Problem Solving', filled: 3, total: 5, color: 'purple' },
    ],
  },
  {
    title: 'Leadership',
    icon: 'people',
    skills: [
      { name: 'Team Collaboration', filled: 3, total: 5, color: 'emerald' },
      { name: 'Communication', filled: 3, total: 5, color: 'blue' },
      { name: 'Community Building', filled: 2, total: 5, color: 'purple' },
    ],
  },
];

export const personalTraits: PersonalTrait[] = [
  { label: 'Problem Solver', colorClass: 'emerald' },
  { label: 'Front-end Developer', colorClass: 'blue' },
  { label: 'Physics Enthusiast', colorClass: 'orange' },
  { label: 'Chess Player', colorClass: 'pink' },
];

export const learningItems: LearningItem[] = [
  { text: 'Advanced Java Programming & Spring Framework', dotColor: 'bg-purple-500' },
  { text: 'Basic Kotlin Programming & Minecraft Modding', dotColor: 'bg-blue-500' },
  { text: 'Data Structures & Algorithms', dotColor: 'bg-emerald-500' },
];

export const funFacts: string[] = [
  '🏆 Won multiple provincial physics competitions',
  '♟️ Chess enthusiast with tournament wins',
  '💡 All my projects stem from my own real-life needs',
];
