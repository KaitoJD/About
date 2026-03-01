'use client';

import { useState, useCallback } from 'react';
import type { ManagedTimeouts, CopyNotificationState } from '@/types';
import {
  discordUsername,
  NOTIFICATION_ENTER_DELAY,
  NOTIFICATION_DISPLAY_DURATION,
  NOTIFICATION_TOTAL_DURATION,
} from '@/data/personal';

export function useCopyToClipboard(timeouts: ManagedTimeouts): CopyNotificationState {
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const showNotification = useCallback(() => {
    setShowCopyNotification(true);

    timeouts.managedSetTimeout(() => {
      setIsNotificationVisible(true);
    }, NOTIFICATION_ENTER_DELAY);

    timeouts.managedSetTimeout(() => {
      setIsNotificationVisible(false);
    }, NOTIFICATION_DISPLAY_DURATION);

    timeouts.managedSetTimeout(() => {
      setShowCopyNotification(false);
    }, NOTIFICATION_TOTAL_DURATION);
  }, [timeouts]);

  const copyDiscordUsername = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(discordUsername);
      showNotification();
    } catch (err) {
      console.error('Failed to copy username:', err);
      alert(`Username: ${discordUsername} (copied to clipboard)`);
    }
  }, [showNotification]);

  return { showCopyNotification, isNotificationVisible, copyDiscordUsername };
}
