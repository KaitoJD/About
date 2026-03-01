'use client';

import { useCallback, useMemo, useRef } from 'react';
import type { ManagedTimeouts } from '@/types';

export function useManagedTimeouts(): ManagedTimeouts {
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const managedSetTimeout = useCallback((callback: () => void, delay: number): NodeJS.Timeout => {
    const timeoutId = setTimeout(() => {
      // Remove this timeout from tracking once it fires naturally
      timeoutRefs.current = timeoutRefs.current.filter((id) => id !== timeoutId);
      callback();
    }, delay);
    timeoutRefs.current.push(timeoutId);
    return timeoutId;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach((id) => clearTimeout(id));
    timeoutRefs.current = [];
  }, []);

  return useMemo(() => ({ managedSetTimeout, clearAllTimeouts }), [managedSetTimeout, clearAllTimeouts]);
}
