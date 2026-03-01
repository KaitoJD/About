import type { ComponentType, CSSProperties } from 'react';

export interface NavItem {
  label: string;
  sectionId: string;
}

export interface TechItem {
  name: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  color: string;
  category: string;
}

export interface SkillRating {
  name: string;
  filled: number;
  total: number;
  color: string;
}

export interface SkillGroup {
  title: string;
  icon: 'code' | 'people';
  skills: SkillRating[];
}

export interface PersonalTrait {
  label: string;
  colorClass: string; // e.g. 'emerald', 'blue', 'orange', 'pink'
}

export interface LearningItem {
  text: string;
  dotColor: string; // tailwind color class for the dot
}

export interface TimelineEntry {
  year: string;
  title: string;
  items: string[];
  tags: { label: string; colorClass: string }[];
  side: 'left' | 'right';
  accentColor: string; // tailwind color name e.g. 'purple', 'emerald', 'blue'
}

export interface ContactCardData {
  title: string;
  description: string;
  iconBgColor: string; // tailwind bg class
  iconColor: string; // tailwind text class
  iconSvg: string; // SVG path(s)
  iconViewBox?: string;
  iconFill?: boolean; // true = fill="currentColor", false = stroke="currentColor"
  action:
    | { type: 'link'; href: string; label: string; buttonColor: string; buttonSvg: string; buttonViewBox?: string; buttonFill?: boolean }
    | { type: 'copy'; username: string; label: string; buttonColor: string; buttonSvg: string; buttonViewBox?: string; buttonFill?: boolean };
}

export interface TypingAnimationState {
  showTyping: boolean;
  typedText: string;
  typedDescription: string;
  isTypingTitle: boolean;
  isTypingDescription: boolean;
  showCursor: boolean;
  showButtons: boolean;
}

export interface AnimationSequenceState {
  showHeader: boolean;
  showBackButton: boolean;
  isAnimationsComplete: boolean;
}

export interface MobileMenuState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
  mobileMenuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export interface CopyNotificationState {
  showCopyNotification: boolean;
  isNotificationVisible: boolean;
  copyDiscordUsername: () => Promise<void>;
}

export interface ManagedTimeouts {
  managedSetTimeout: (callback: () => void, delay: number) => NodeJS.Timeout;
  clearAllTimeouts: () => void;
}
