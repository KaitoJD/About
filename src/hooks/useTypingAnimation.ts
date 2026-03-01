'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ManagedTimeouts, TypingAnimationState } from '@/types';
import { fullText, descriptionText } from '@/data/personal';
import { getRandomTypingSpeed } from '@/utils/typingSpeed';

export function useTypingAnimation(timeouts: ManagedTimeouts): TypingAnimationState {
  const [isMounted, setIsMounted] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [isTypingTitle, setIsTypingTitle] = useState(true);
  const [isTypingDescription, setIsTypingDescription] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      timeouts.managedSetTimeout(() => {
        setShowTyping(true);
      }, 200);
    }
  }, [isMounted, timeouts]);

  // Typing state-machine
  const typeTitle = useCallback(() => {
    let currentIndex = 0;

    const tick = () => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;

        if (currentIndex === 4 && fullText.slice(0, 4) === 'Hi! ') {
          const pause = getRandomTypingSpeed(500, 0.2);
          timeouts.managedSetTimeout(tick, pause);
        } else {
          const speed = getRandomTypingSpeed(60, 0.3);
          timeouts.managedSetTimeout(tick, speed);
        }
      } else {
        setIsTypingTitle(false);
        const pause = getRandomTypingSpeed(400, 0.2);
        timeouts.managedSetTimeout(() => {
          setIsTypingDescription(true);
          typeDescription();
        }, pause);
      }
    };

    const typeDescription = () => {
      let descIndex = 0;

      const descTick = () => {
        if (descIndex <= descriptionText.length) {
          setTypedDescription(descriptionText.slice(0, descIndex));
          descIndex++;
          const speed = getRandomTypingSpeed(55, 0.5);
          timeouts.managedSetTimeout(descTick, speed);
        } else {
          setIsTypingDescription(false);
          timeouts.managedSetTimeout(() => setShowCursor(false), 200);
          timeouts.managedSetTimeout(() => setShowButtons(true), 400);
        }
      };

      descTick();
    };

    tick();
  }, [timeouts]);

  useEffect(() => {
    if (!showTyping) return;
    typeTitle();
    return () => {
      timeouts.clearAllTimeouts();
    };
  }, [showTyping, typeTitle, timeouts]);

  return {
    showTyping,
    typedText,
    typedDescription,
    isTypingTitle,
    isTypingDescription,
    showCursor,
    showButtons,
  };
}
