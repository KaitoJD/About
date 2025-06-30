"use client";

import TechStackDynamic from '../components/TechStackDynamic';
import Loading from '../components/Loading';
import { useEffect, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import '../styles/loading.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Animation sequence states
  const [showTyping, setShowTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [isTypingTitle, setIsTypingTitle] = useState(true);
  const [isTypingDescription, setIsTypingDescription] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [isAnimationsComplete, setIsAnimationsComplete] = useState(false);
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const isMobileMenuOpenRef = useRef(false);
  
  // Refs to store timeout IDs for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Helper function to manage timeouts with cleanup
  const managedSetTimeout = useCallback((callback: () => void, delay: number): NodeJS.Timeout => {
    const timeoutId = setTimeout(callback, delay);
    timeoutRefs.current.push(timeoutId);
    return timeoutId;
  }, []);

  // Cleanup function to clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutRefs.current = [];
  }, []);

  // Text to type
  const fullText = "Hi! I'm Nguyen Sy Nguyen";
  const descriptionText = "A Software Engineering student passionate about creating products that solve real-world problems.";

  // Keep ref in sync with state
  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Ensure component is mounted on client-side
    setIsMounted(true);
    
    // Close mobile menu when clicking outside
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

    // Close mobile menu when Escape key is pressed
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

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Start animation sequence after loading
    managedSetTimeout(() => {
      setShowTyping(true);
    }, 500); // Small delay to show background first
  }, [managedSetTimeout]);

  // Animation sequence effect
  useEffect(() => {
    if (!showTyping) return;

    let currentIndex = 0;
    
    // First, type the title
    const typeTitle = () => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
        managedSetTimeout(typeTitle, 80); // Typing speed
      } else {
        // Title completed, pause then start description
        setIsTypingTitle(false);
        managedSetTimeout(() => {
          setIsTypingDescription(true);
          currentIndex = 0; // Reset for description
          typeDescription();
        }, 800);
      }
    };

    // Then type the description
    const typeDescription = () => {
      if (currentIndex <= descriptionText.length) {
        setTypedDescription(descriptionText.slice(0, currentIndex));
        currentIndex++;
        managedSetTimeout(typeDescription, 50); // Slightly faster for description
      } else {
        // Description completed
        setIsTypingDescription(false);
        managedSetTimeout(() => {
          setShowCursor(false); // Hide cursor
        }, 500);
        // Show buttons after a delay
        managedSetTimeout(() => {
          setShowButtons(true);
        }, 1000);
      }
    };

    typeTitle();
  }, [showTyping, fullText, descriptionText, managedSetTimeout]);

  // Show header after buttons
  useEffect(() => {
    if (showButtons) {
      managedSetTimeout(() => {
        setShowHeader(true);
      }, 1000);
    }
  }, [showButtons, managedSetTimeout]);

  // Show back button after header
  useEffect(() => {
    if (showHeader) {
      managedSetTimeout(() => {
        setShowBackButton(true);
      }, 500);
    }
  }, [showHeader, managedSetTimeout]);

  // Mark animations as complete after back button appears
  useEffect(() => {
    if (showBackButton) {
      managedSetTimeout(() => {
        setIsAnimationsComplete(true);
      }, 500); // Allow time for back button animation to settle
    }
  }, [showBackButton, managedSetTimeout]);

  // Cleanup all timeouts on component unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  // Block interactions until animations are complete
  useEffect(() => {
    if (!isAnimationsComplete) {
      // Prevent scrolling and add interaction blocking class
      document.body.style.overflow = 'hidden';
      document.body.classList.add('interactions-blocked');
      
      // Prevent interactions by adding event listeners
      const preventInteraction = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      // Add listeners for various interaction events
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
        // Clean up event listeners
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
      // Restore scrolling and remove blocking class when animations are complete
      document.body.style.overflow = '';
      document.body.classList.remove('interactions-blocked');
    }
  }, [isAnimationsComplete]);

  const toggleMobileMenu = useCallback(() => {
    if (isAnimationsComplete) {
      setIsMobileMenuOpen(prev => !prev);
    }
  }, [isAnimationsComplete]);

  const closeMobileMenu = useCallback(() => {
    if (isAnimationsComplete) {
      setIsMobileMenuOpen(false);
    }
  }, [isAnimationsComplete]);

  // Don't render anything until mounted on client-side
  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <Loading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 scroll-smooth">
      {/* Interaction blocking overlay */}
      {!isAnimationsComplete && (
        <div 
          className="fixed inset-0 z-[9999] bg-transparent cursor-not-allowed"
          style={{ pointerEvents: 'all' }}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          onScroll={(e) => e.preventDefault()}
        />
      )}
      
      {/* Navigation */}
      <nav className={clsx(
        "fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-50 h-16 transition-transform duration-700",
        {
          "translate-y-0": showHeader,
          "-translate-y-full": !showHeader,
        }
      )}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Back to Hub Button - Responsive */}
            <a
              href="https://kaitojd.me"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-900 dark:text-white font-mono hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-500 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
                {
                  "translate-x-0 opacity-100": showBackButton,
                  "translate-x-8 opacity-0": !showBackButton,
                }
              )}
            >
              <span className="text-emerald-600 dark:text-emerald-400">&lt;&lt;</span>
              <span className="hidden sm:inline">{" "}Back to Hub</span>
              <span className="sm:hidden">{" "}Back to Hub</span>
            </a>

            {/* Desktop Menu */}
            <div className={clsx(
              "hidden md:flex space-x-4 lg:space-x-8 transition-all duration-500 delay-200",
              {
                "opacity-100 translate-y-0": showHeader,
                "opacity-0 translate-y-2": !showHeader,
              }
            )}>
              <a href="#about" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm lg:text-base">
                About
              </a>
              <a href="#timeline" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm lg:text-base">
                Timeline
              </a>
              <a href="#contact" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm lg:text-base">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className={clsx(
              "md:hidden relative transition-all duration-500 delay-200",
              {
                "opacity-100 translate-y-0": showHeader,
                "opacity-0 translate-y-2": !showHeader,
              }
            )}>
              <button 
                ref={mobileMenuButtonRef}
                className="mobile-menu-button p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Mobile Dropdown Menu */}
              <div 
                id="mobile-menu"
                ref={mobileMenuRef}
                className={clsx(
                  'mobile-menu absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-200 origin-top-right transform',
                  {
                    'opacity-100 visible scale-100': isMobileMenuOpen,
                    'opacity-0 invisible scale-95': !isMobileMenuOpen,
                  }
                )}
              >
                <div className="py-2">
                  <a 
                    href="#about" 
                    className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    About
                  </a>
                  <a 
                    href="#timeline" 
                    className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Timeline
                  </a>
                  <a 
                    href="#contact" 
                    className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 font-mono pt-16 sm:pt-20">
        <div className="max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Typing Animation for Title */}
              <h1 className={clsx(
                "hero-title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white leading-tight font-mono transition-opacity duration-500",
                {
                  "opacity-100": showTyping,
                  "opacity-0": !showTyping,
                }
              )}>
                {/* Render the typed title with proper highlighting */}
                {typedText.split('').map((char, index) => {
                  const nameStart = fullText.indexOf("Nguyen Sy Nguyen");
                  const nameEnd = nameStart + "Nguyen Sy Nguyen".length;
                  
                  if (index >= nameStart && index < nameEnd) {
                    return (
                      <span key={index} className="text-emerald-600 dark:text-emerald-400">
                        {char}
                      </span>
                    );
                  }
                  return <span key={index}>{char}</span>;
                })}
                {(isTypingTitle && showCursor) && (
                  <span className="text-emerald-600 dark:text-emerald-400 typing-cursor">
                    |
                  </span>
                )}
              </h1>
              
              {/* Typing Animation for Description */}
              <p className={clsx(
                "text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto font-mono transition-all duration-700",
                {
                  "opacity-100": isTypingDescription || typedDescription.length > 0,
                  "opacity-0": !isTypingDescription && typedDescription.length === 0,
                }
              )}>
                {/* Render the typed description with proper highlighting */}
                {typedDescription.split('').map((char, index) => {
                  const fullText = "A Software Engineering student passionate about creating products that solve real-world problems.";
                  const highlightStart = fullText.indexOf("creating products");
                  const highlightEnd = highlightStart + "creating products".length;
                  
                  if (index >= highlightStart && index < highlightEnd) {
                    return (
                      <span key={index} className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {char}
                      </span>
                    );
                  }
                  return <span key={index}>{char}</span>;
                })}
                {(isTypingDescription && showCursor) && (
                  <span className="text-emerald-600 dark:text-emerald-400 typing-cursor">
                    |
                  </span>
                )}
              </p>
            </div>
            
            {/* Buttons with staggered animation */}
            <div className={clsx(
              "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-700",
              {
                "opacity-100 translate-y-0": showButtons,
                "opacity-0 translate-y-8": !showButtons,
              }
            )}>
              <a
                href="#timeline"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 text-center inline-flex items-center justify-center group font-mono text-sm sm:text-base button-hover-effect"
              >
                <span>View My Journey</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 text-center font-mono text-sm sm:text-base button-hover-effect"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 font-sans scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              About Me
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-emerald-600 mx-auto mb-6 sm:mb-8"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Hello! I&apos;m a passionate Software Engineering student with a love for creating beautiful, 
                functional, and user-friendly digital experiences. I specialize in full-stack development 
                and enjoy turning complex problems into simple, elegant solutions.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                My expertise spans across frontend frameworks like React and Next.js, backend technologies 
                including Node.js, and programming languages such as TypeScript, JavaScript, Java, and C. 
                I&apos;m always eager to learn new technologies and apply them to real-world projects.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 sm:pt-6">
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  Problem Solver
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  Full-Stack Developer
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  Tech Enthusiast
                </span>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700 p-6 sm:p-8 lg:p-10 rounded-xl shadow-sm order-1 lg:order-2">
              <TechStackDynamic />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 font-sans scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              My Journey
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-emerald-600 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A timeline of my achievements, experiences, and milestones.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Main trunk - vertical line */}
            <div className="absolute left-1/2 top-0 w-1 bg-emerald-600 dark:bg-emerald-400 transform -translate-x-1/2" style={{ height: 'calc(100% - 100px)' }}></div>

            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {/* Timeline Item 1 - 2024 (Right branch) */}
              <div className="relative">
                {/* Branch line */}
                <div className="absolute left-1/2 top-8 w-8 sm:w-12 md:w-16 lg:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400"></div>
                {/* Junction dot */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-10"></div>
                
                <div className="flex justify-end">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ml-auto pl-12 sm:pl-16 md:pl-20 lg:pl-28">
                    <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600 dark:border-emerald-400">
                      <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm mb-2">
                        2024
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                        Outstanding Academic & University Achievement
                      </h3>
                      <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        <p>• 2nd Prize in the Provincial Excellent Student Selection Exam (Physics)</p>
                        <p>• Scored 9.25 in Physics in the National High School Graduation Exam (Top 1.9%)</p>
                        <p>• Got Scholarships for Information Technology at FPT University (100%+)</p>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                        <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-indigo-200 dark:border-indigo-700">
                          High School Achievements
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 - 2023 (Left branch) */}
              <div className="relative">
                {/* Branch line */}
                <div className="absolute right-1/2 top-8 w-8 sm:w-12 md:w-16 lg:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400"></div>
                {/* Junction dot */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-10"></div>
                
                <div className="flex justify-start">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mr-auto pr-12 sm:pr-16 md:pr-20 lg:pr-28">
                    <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-r-4 border-blue-600 dark:border-blue-400">
                      <div className="text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm mb-2">
                        2023
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                        National Recognition in Physics
                      </h3>
                      <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        <p>• 3rd Prize in the Provincial Excellent Student Selection Exam (Physics)</p>
                        <p>• Candidate in the National Excellent Student Selection Exam (Physics)</p>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                        <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-indigo-200 dark:border-indigo-700">
                          High School Achievements
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 - 2022 (Right branch) */}
              <div className="relative">
                {/* Branch line */}
                <div className="absolute left-1/2 top-8 w-8 sm:w-12 md:w-16 lg:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400"></div>
                {/* Junction dot */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-10"></div>
                
                <div className="flex justify-end">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ml-auto pl-12 sm:pl-16 md:pl-20 lg:pl-28">
                    <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-600 dark:border-orange-400">
                      <div className="text-orange-600 dark:text-orange-400 font-semibold text-xs sm:text-sm mb-2">
                        2022
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                        Continued Excellence in Physics
                      </h3>
                      <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        <p>• 3rd Prize in the Provincial Excellent Student Selection Exam (Physics)</p>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                        <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-indigo-200 dark:border-indigo-700">
                          High School Achievements
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4 - 2021 (Left branch) */}
              <div className="relative">
                {/* Branch line */}
                <div className="absolute right-1/2 top-8 w-8 sm:w-12 md:w-16 lg:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400"></div>
                {/* Junction dot */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-10"></div>
                
                <div className="flex justify-start">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mr-auto pr-12 sm:pr-16 md:pr-20 lg:pr-28">
                    <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-r-4 border-pink-600 dark:border-pink-400">
                      <div className="text-pink-600 dark:text-pink-400 font-semibold text-xs sm:text-sm mb-2">
                        2021
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                        Academic & Sports Excellence
                      </h3>
                      <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        <p>• 3rd Prize in the Provincial Excellent Student Selection Exam (Physics)</p>
                        <p>• 1st Prize in the Provincial Phu Dong Sports Game (Chess)</p>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                        <span className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-violet-200 dark:border-violet-700">
                          Junior High School Achievements
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Root/Origin point */}
              <div className="relative">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 text-white p-3 sm:p-4 rounded-full shadow-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">The Beginning</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">My journey starts here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 font-sans scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Let&apos;s Connect
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Ready to collaborate on your next project or discuss new opportunities? Let&apos;s chat!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email Card */}
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center group hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600 flex flex-col">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Email</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm flex-grow">
                Drop me a line for project inquiries or collaboration opportunities
              </p>
              <a 
                href="mailto:contact.nguyensynguyen@gmail.com"
                className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group-hover:scale-105 h-12"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Email
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center group hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600 flex flex-col">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">LinkedIn</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm flex-grow">
                Connect with me for professional networking and career discussions
              </p>
              <a 
                href="https://linkedin.com/in/nguyensynguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group-hover:scale-105 h-12"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Connect
              </a>
            </div>

            {/* GitHub Card */}
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center group hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600 flex flex-col">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">GitHub</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm flex-grow">
                Explore my projects and see what I&apos;ve been building lately
              </p>
              <a 
                href="https://github.com/KaitoJD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group-hover:scale-105 h-12"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Profile
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-8 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Start a Project?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              I&apos;m always excited to work on innovative projects and help bring ideas to life. 
              Let&apos;s discuss how we can collaborate!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:contact.nguyensynguyen@gmail.com"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Me an Email
              </a>
              <a 
                href="https://linkedin.com/in/nguyensynguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2m5-4v2m0 4h.01" />
                </svg>
                Let&apos;s Chat on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Nguyen Sy Nguyen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
