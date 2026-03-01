'use client';

import { useState, useEffect } from 'react';
import type { ManagedTimeouts, AnimationSequenceState } from '@/types';

export function useAnimationSequence(
  showButtons: boolean,
  timeouts: ManagedTimeouts,
): AnimationSequenceState {
  const [showHeader, setShowHeader] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [isAnimationsComplete, setIsAnimationsComplete] = useState(false);

  useEffect(() => {
    if (showButtons) {
      timeouts.managedSetTimeout(() => setShowHeader(true), 300);
    }
  }, [showButtons, timeouts]);

  useEffect(() => {
    if (showHeader) {
      timeouts.managedSetTimeout(() => setShowBackButton(true), 400);
    }
  }, [showHeader, timeouts]);

  useEffect(() => {
    if (showBackButton) {
      timeouts.managedSetTimeout(() => setIsAnimationsComplete(true), 200);
    }
  }, [showBackButton, timeouts]);

  return { showHeader, showBackButton, isAnimationsComplete };
}
