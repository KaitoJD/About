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
  
  // Copy notification state
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  
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

  // Copy Discord username function
  const copyDiscordUsername = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('_notNguyen');
      setShowCopyNotification(true);
      
      // Trigger entrance animation after mounting
      managedSetTimeout(() => {
        setIsNotificationVisible(true);
      }, 10);
      
      // Start exit animation after 2.5 seconds
      managedSetTimeout(() => {
        setIsNotificationVisible(false);
      }, 2500);
      
      // Hide notification completely after exit animation finishes
      managedSetTimeout(() => {
        setShowCopyNotification(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy username:', err);
      // Fallback for browsers that don't support clipboard API
      alert('Username: _notNguyen (copied to clipboard)');
    }
  }, [managedSetTimeout]);

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
      {/* Copy Success Notification */}
      {showCopyNotification && (
        <div className={`fixed top-4 right-4 z-[10000] transition-all duration-500 ease-in-out transform ${
          isNotificationVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-[-100px] opacity-0 scale-95'
        }`}>
          <div className={`bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 ${
            isNotificationVisible 
              ? 'shadow-2xl hover:shadow-emerald-500/25' 
              : 'shadow-sm'
          }`}>
            <div className={`transition-transform duration-300 ${
              isNotificationVisible ? 'scale-100' : 'scale-75'
            }`}>
              <svg className="w-5 h-5 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className={`font-medium transition-all duration-300 ${
              isNotificationVisible ? 'opacity-100' : 'opacity-70'
            }`}>
              Discord username copied to clipboard!
            </span>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 rounded-b-lg transition-all duration-[2500ms] ease-linear"
                 style={{ width: showCopyNotification ? '100%' : '0%' }}>
            </div>
          </div>
        </div>
      )}

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
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Passionate about crafting digital experiences that make a difference
            </p>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
            {/* Personal Story & Background */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              {/* Introduction */}
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-6 sm:p-8 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                  Who I Am
                </h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Hello! I&apos;m <span className="font-semibold text-emerald-600 dark:text-emerald-400">Nguyen Sy Nguyen</span>, 
                  a passionate Software Engineering student at <span className="font-semibold">FPT University</span> with 
                  a deep love for creating innovative digital solutions that solve real-world problems.
                </p>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  My journey in technology began with a curiosity about how things work, which evolved into a passion 
                  for building them. From winning provincial physics competitions to managing developer communities, 
                  I&apos;ve always been driven by the desire to learn, create, and share knowledge.
                </p>
              </div>

              {/* Skills & Expertise */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Technical Skills */}
                <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Development
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Frontend</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Backend</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Problem Solving</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Soft Skills */}
                <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Leadership
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Team Collaboration</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Communication</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Community Building</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Traits */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
                  Problem Solver
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Full-Stack Developer
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Community Leader
                </span>
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                  Physics Enthusiast
                </span>
                <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
                  Chess Player
                </span>
              </div>
            </div>
            
            {/* Tech Stack & Tools */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 dark:bg-slate-700 p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Tech Stack & Tools
                </h3>
                <TechStackDynamic />
              </div>

              {/* Current Focus */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Currently Learning
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Advanced React Patterns & State Management
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Cloud Architecture & DevOps Practices
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    Advanced Java and Spring Boot
                  </div>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Fun Facts
                </h4>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p>🏆 Won multiple provincial physics competitions</p>
                  <p>♟️ Chess enthusiast with tournament wins</p>
                  <p>🌟 Discord community administrator at FCoder</p>
                  <p>💡 Enjoys turning complex problems into elegant solutions</p>
                </div>
              </div>
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
            {/* Main trunk - vertical line with lower z-index */}
            <div className="absolute left-1/2 top-0 w-1 bg-emerald-600 dark:bg-emerald-400 transform -translate-x-1/2 z-0" style={{ height: 'calc(100% - 100px)' }}></div>

            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {/* Timeline Item - 2025 Discord Administrator (Left branch) */}
              <div className="relative">
                {/* Branch line - hidden on mobile, behind cards on larger screens */}
                <div className="hidden sm:block absolute right-1/2 top-8 w-8 md:w-12 lg:w-16 xl:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400 z-0"></div>
                {/* Junction dot - lower z-index so cards appear on top */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-0"></div>
                
                <div className="flex justify-start">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mr-auto pr-4 sm:pr-12 md:pr-16 lg:pr-20 xl:pr-28">
                    <div className="relative z-10 bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-r-4 border-purple-600 dark:border-purple-400">
                      <div className="text-purple-600 dark:text-purple-400 font-semibold text-xs sm:text-sm mb-2">
                        June 2025 - Present
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                        Community Leadership & Management
                      </h3>
                      <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        <p>• Discord Administrator at FCoder</p>
                        <p>• Managing and growing a vibrant developer community</p>
                        <p>• Facilitating technical discussions and knowledge sharing</p>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-purple-200 dark:border-purple-700">
                          Community Leadership
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 1a - 2024 University Achievement (Right branch) */}
              <div className="relative">
                {/* Branch line - hidden on mobile, behind cards on larger screens */}
                <div className="hidden sm:block absolute left-1/2 top-8 w-8 md:w-12 lg:w-16 xl:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400 z-0"></div>
                {/* Junction dot - lower z-index so cards appear on top */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-0"></div>
                
                <div className="flex justify-end">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ml-auto pl-4 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-28">
                    <div className="relative z-10 bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600 dark:border-emerald-400">
                      <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm mb-2">
                        2024
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                        New Beginnings at FPT University
                      </h3>
                      <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        <p>• Got Scholarships for Information Technology at FPT University (100%+)</p>
                        <p>• 2nd Prize in the Freshman Sports Festival (Chess)</p>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                        <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-emerald-200 dark:border-emerald-700">
                          University Achievements
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 1b - 2024 Academic Excellence (Left branch) */}
              <div className="relative">
                {/* Branch line - hidden on mobile, behind cards on larger screens */}
                <div className="hidden sm:block absolute right-1/2 top-8 w-8 md:w-12 lg:w-16 xl:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400 z-0"></div>
                {/* Junction dot - lower z-index so cards appear on top */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-0"></div>
                
                <div className="flex justify-start">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mr-auto pr-4 sm:pr-12 md:pr-16 lg:pr-20 xl:pr-28">
                    <div className="relative z-10 bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-r-4 border-emerald-600 dark:border-emerald-400">
                      <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm mb-2">
                        2024
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                        Outstanding Academic Excellence
                      </h3>
                      <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        <p>• 2nd Prize in the Provincial Excellent Student Selection Exam (Physics)</p>
                        <p>• Scored 9.25 in Physics in the National High School Graduation Exam (Top 1.9%)</p>
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

              {/* Timeline Item 2 - 2023 (Right branch) */}
              <div className="relative">
                {/* Branch line - hidden on mobile, behind cards on larger screens */}
                <div className="hidden sm:block absolute left-1/2 top-8 w-8 md:w-12 lg:w-16 xl:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400 z-0"></div>
                {/* Junction dot - lower z-index so cards appear on top */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-0"></div>
                
                <div className="flex justify-end">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ml-auto pl-4 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-28">
                    <div className="relative z-10 bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 dark:border-blue-400">
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

              {/* Timeline Item 3 - 2022 (Left branch) */}
              <div className="relative">
                {/* Branch line - hidden on mobile, behind cards on larger screens */}
                <div className="hidden sm:block absolute right-1/2 top-8 w-8 md:w-12 lg:w-16 xl:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400 z-0"></div>
                {/* Junction dot - lower z-index so cards appear on top */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-0"></div>
                
                <div className="flex justify-start">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mr-auto pr-4 sm:pr-12 md:pr-16 lg:pr-20 xl:pr-28">
                    <div className="relative z-10 bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-r-4 border-orange-600 dark:border-orange-400">
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

              {/* Timeline Item 4 - 2021 (Right branch) */}
              <div className="relative">
                {/* Branch line - hidden on mobile, behind cards on larger screens */}
                <div className="hidden sm:block absolute left-1/2 top-8 w-8 md:w-12 lg:w-16 xl:w-24 h-0.5 bg-emerald-600 dark:bg-emerald-400 z-0"></div>
                {/* Junction dot - lower z-index so cards appear on top */}
                <div className="absolute left-1/2 top-6 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full border-4 border-white dark:border-slate-50 transform -translate-x-1/2 z-0"></div>
                
                <div className="flex justify-end">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ml-auto pl-4 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-28">
                    <div className="relative z-10 bg-white dark:bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-pink-600 dark:border-pink-400">
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Let&apos;s Connect
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Ready to collaborate on your next project, discuss opportunities, or just have a chat? Find me on these platforms!
            </p>
          </div>

          {/* Professional Contact */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="8" width="16" height="12" rx="2" ry="2" strokeWidth="2"/>
                <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2"/>
                <line x1="12" y1="14" x2="12" y2="14" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Professional Contact
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
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
          </div>

          {/* Personal & Gaming */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Personal & Gaming
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Discord Card */}
              <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center group hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600 flex flex-col">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Discord</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm flex-grow">
                  Join me on Discord for casual chats and community discussions
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-mono bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 px-3 py-2 rounded">
                    @_notNguyen
                  </p>
                  <button 
                    onClick={copyDiscordUsername}
                    className="inline-flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group-hover:scale-105 h-12"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Username
                  </button>
                </div>
              </div>

              {/* Facebook Card */}
              <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center group hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600 flex flex-col">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Facebook</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm flex-grow">
                  Connect with me on Facebook for personal updates and conversations
                </p>
                <a 
                  href="https://facebook.com/kaito.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group-hover:scale-105 h-12"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Profile
                </a>
              </div>

              {/* Chess Card */}
              <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center group hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600 flex flex-col">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {/* Chess King Icon */}
                  <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c.5 0 1 .4 1 1v1h1c.5 0 1 .4 1 1s-.4 1-1 1h-1v.5L14.5 8H16c.5 0 1 .4 1 1s-.4 1-1 1h-.5L17 11.5c.3.3.3.8 0 1.1l-1.4 1.4c-.3.3-.8.3-1.1 0l-.5-.5V15h2c.5 0 1 .4 1 1v1H7v-1c0-.5.4-1 1-1h2v-1.5l-.5.5c-.3.3-.8.3-1.1 0L7 13.6c-.3-.3-.3-.8 0-1.1L8.5 11H8c-.5 0-1-.4-1-1s.4-1 1-1h1.5L11 6.5V6h-1c-.5 0-1-.4-1-1s.4-1 1-1h1V3c0-.5.4-1 1-1zm0 16c-3.3 0-6 1.3-6 3v1h12v-1c0-1.7-2.7-3-6-3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Chess</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm flex-grow">
                  Challenge me to a game of chess or check out my tournament history
                </p>
                <a 
                  href="https://chess.com/member/nsNguyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group-hover:scale-105 h-12"
                >
                  {/* Chess Board Icon */}
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h3v3H3V3zm3 3h3v3H6V6zm3 3h3v3H9V9zm3 3h3v3h-3v-3zm3 3h3v3h-3v-3zm0-6h3v3h-3V6zm0-3h3v3h-3V3zM15 6h3v3h-3V6zm-3-3h3v3h-3V3zm-3 0h3v3H9V3zM6 9h3v3H6V9zm-3 3h3v3H3v-3zm0 3h3v3H3v-3zm3 0h3v3H6v-3zm3 0h3v3H9v-3zm6 0h3v3h-3v-3zM15 18h3v3h-3v-3zm3-6h3v3h-3v-3zM3 18h18v3H3v-3z"/>
                  </svg>
                  Play Chess
                </a>
              </div>
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
