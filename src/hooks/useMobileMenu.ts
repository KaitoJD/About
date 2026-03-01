'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { MobileMenuState } from '@/types';

export function useMobileMenu(isAnimationsComplete: boolean): MobileMenuState {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobileMenuOpenRef = useRef(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Keep ref in sync
  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpenRef.current &&
        mobileMenuRef.current &&
        mobileMenuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpenRef.current && isAnimationsComplete) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimationsComplete]);

  const toggleMobileMenu = useCallback(() => {
    if (isAnimationsComplete) {
      setIsMobileMenuOpen((prev) => !prev);
    }
  }, [isAnimationsComplete]);

  return { isMobileMenuOpen, toggleMobileMenu, mobileMenuRef, mobileMenuButtonRef };
}
