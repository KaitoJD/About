import clsx from 'clsx';
import { fullText, descriptionText, highlightedName, highlightedPhrase } from '@/data/personal';
import { scrollToSection } from '@/utils/scrollToSection';
import type { TypingAnimationState } from '@/types';

interface HeroSectionProps {
  typing: TypingAnimationState;
}

export default function HeroSection({ typing }: HeroSectionProps) {
  const {
    showTyping,
    typedText,
    typedDescription,
    isTypingTitle,
    isTypingDescription,
    showCursor,
    showButtons,
  } = typing;

  const nameStart = fullText.indexOf(highlightedName);
  const nameEnd = nameStart + highlightedName.length;

  const phraseStart = descriptionText.indexOf(highlightedPhrase);
  const phraseEnd = phraseStart + highlightedPhrase.length;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 font-mono pt-16 sm:pt-20">
      <div className="max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Typing Animation for Title */}
            <h1
              className={clsx(
                'hero-title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white leading-tight font-mono transition-opacity duration-500',
                { 'opacity-100': showTyping, 'opacity-0': !showTyping },
              )}
            >
              {typedText.split('').map((char, index) => {
                if (index >= nameStart && index < nameEnd) {
                  return (
                    <span key={index} className="text-emerald-600 dark:text-emerald-400">
                      {char}
                    </span>
                  );
                }
                return <span key={index}>{char}</span>;
              })}
              {isTypingTitle && showCursor && (
                <span className="text-emerald-600 dark:text-emerald-400 typing-cursor">|</span>
              )}
            </h1>

            {/* Typing Animation for Description */}
            <p
              className={clsx(
                'text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto font-mono transition-all duration-700',
                {
                  'opacity-100': isTypingDescription || typedDescription.length > 0,
                  'opacity-0': !isTypingDescription && typedDescription.length === 0,
                },
              )}
            >
              {typedDescription.split('').map((char, index) => {
                if (index >= phraseStart && index < phraseEnd) {
                  return (
                    <span key={index} className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {char}
                    </span>
                  );
                }
                return <span key={index}>{char}</span>;
              })}
              {isTypingDescription && showCursor && (
                <span className="text-emerald-600 dark:text-emerald-400 typing-cursor">|</span>
              )}
            </p>
          </div>

          {/* Buttons */}
          <div
            className={clsx(
              'flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-700',
              { 'opacity-100 translate-y-0': showButtons, 'opacity-0 translate-y-8': !showButtons },
            )}
          >
            <button
              onClick={() => scrollToSection('timeline')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 text-center inline-flex items-center justify-center group font-mono text-sm sm:text-base button-hover-effect"
            >
              <span>View My Journey</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 text-center font-mono text-sm sm:text-base button-hover-effect"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
