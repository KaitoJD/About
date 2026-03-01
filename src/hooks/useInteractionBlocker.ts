'use client';

import { useEffect } from 'react';

export function useInteractionBlocker(isAnimationsComplete: boolean): void {
  useEffect(() => {
    if (!isAnimationsComplete) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('interactions-blocked');

      const preventInteraction = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      document.addEventListener('click', preventInteraction, true);
      document.addEventListener('mousedown', preventInteraction, true);
      document.addEventListener('mouseup', preventInteraction, true);
      document.addEventListener('touchstart', preventInteraction, true);
      document.addEventListener('touchend', preventInteraction, true);
      document.addEventListener('keydown', preventInteraction, true);
      document.addEventListener('keyup', preventInteraction, true);
      document.addEventListener('wheel', preventInteraction, { passive: false });
      document.addEventListener('scroll', preventInteraction, true);

      return () => {
        document.removeEventListener('click', preventInteraction, true);
        document.removeEventListener('mousedown', preventInteraction, true);
        document.removeEventListener('mouseup', preventInteraction, true);
        document.removeEventListener('touchstart', preventInteraction, true);
        document.removeEventListener('touchend', preventInteraction, true);
        document.removeEventListener('keydown', preventInteraction, true);
        document.removeEventListener('keyup', preventInteraction, true);
        document.removeEventListener('wheel', preventInteraction);
        document.removeEventListener('scroll', preventInteraction, true);
        document.body.classList.remove('interactions-blocked');
      };
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('interactions-blocked');
    }
  }, [isAnimationsComplete]);
}
