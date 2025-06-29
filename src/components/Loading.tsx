"use client";

import { useEffect, useState } from 'react';

interface LoadingProps {
  onComplete: () => void;
}

export default function Loading({ onComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    // Progress simulation
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          // Show "Done" for a moment before completing
          setShowDone(true);
          timeoutId = setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        // Faster progress in the beginning, slower at the end
        const increment = prev < 70 ? Math.random() * 8 + 2 : Math.random() * 2 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => {
      clearInterval(progressTimer);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Loading Text */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 font-mono">
            Loading...
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div 
            className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-3"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Loading progress"
          >
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">
            <span className="text-emerald-600 dark:text-emerald-400">&gt;&gt;</span> {showDone ? 'Done' : `${Math.round(progress)}% complete`}
          </p>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center space-x-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
