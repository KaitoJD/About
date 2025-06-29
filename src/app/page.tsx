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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const isMobileMenuOpenRef = useRef(false);

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
      if (event.key === 'Escape' && isMobileMenuOpenRef.current) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Don't render anything until mounted on client-side
  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <Loading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 scroll-smooth animate-fade-in">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-50 h-16 animate-slide-down">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo - Responsive text size */}
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-900 dark:text-white font-mono">
              <span className="text-emerald-600 dark:text-emerald-400">&gt;&gt;</span>
              <span className="hidden sm:inline">{" "}welcome to my digital space</span>
              <span className="sm:hidden">{" "}NSN</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              <a href="#about" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm lg:text-base">
                About
              </a>
              <a href="#skills" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm lg:text-base">
                Skills
              </a>
              <a href="#projects" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm lg:text-base">
                Projects
              </a>
              <a href="#contact" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm lg:text-base">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative">
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
                    href="#skills" 
                    className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Skills
                  </a>
                  <a 
                    href="#projects" 
                    className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Projects
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
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white leading-tight font-mono whitespace-nowrap">
                Hi! I&apos;m{" "}
                <span className="text-emerald-600 dark:text-emerald-400 glitch-text" data-text="Nguyen Sy Nguyen">
                  Nguyen Sy Nguyen
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto font-mono">
                I am a Software Engineering student, and my greatest passion is{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  creating products
                </span>{" "}
                that meet real-world needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="#projects"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 text-center inline-flex items-center justify-center group font-mono text-sm sm:text-base"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 text-center font-mono text-sm sm:text-base"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 font-sans scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              About Me
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Hello! I&apos;m a passionate Software Engineering student with a love for creating beautiful, 
                functional, and user-friendly digital experiences. I specialize in full-stack development 
                and enjoy turning complex problems into simple, elegant solutions.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                My expertise spans across frontend frameworks like React and Next.js, backend technologies 
                including Node.js, and programming languages such as TypeScript, JavaScript, Java, and C. 
                I&apos;m always eager to learn new technologies and apply them to real-world projects.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-4 py-2 rounded-full text-sm font-medium">
                  Problem Solver
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                  Full-Stack Developer
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                  Tech Enthusiast
                </span>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <TechStackDynamic />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 font-sans scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Frontend</h3>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>React & Next.js</li>
                <li>TypeScript & JavaScript</li>
                <li>HTML5 & CSS3</li>
                <li>Tailwind CSS</li>
                <li>Responsive Design</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Backend</h3>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>Node.js & Express</li>
                <li>Java Spring Boot</li>
                <li>RESTful APIs</li>
                <li>Database Design</li>
                <li>Server Management</li>
              </ul>
            </div>

            {/* Tools */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Tools & Others</h3>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>Git & GitHub</li>
                <li>VS Code</li>
                <li>npm & yarn</li>
                <li>Linux/Windows</li>
                <li>Problem Solving</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 font-sans scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge and learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-6xl font-bold opacity-20">01</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Portfolio Website
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A modern, responsive portfolio built with Next.js and Tailwind CSS, featuring dark mode and smooth animations.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm">
                    Next.js
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    Tailwind CSS
                  </span>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                    View Project
                  </a>
                  <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                    Source Code
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <div className="text-white text-6xl font-bold opacity-20">02</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Coming Soon
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Exciting projects are in development. Stay tuned for updates on innovative solutions and creative implementations.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                    In Progress
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-400 text-sm">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <div className="text-white text-6xl font-bold opacity-20">03</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Future Project
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  More amazing projects are being planned. Each will showcase different aspects of modern web development and software engineering.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                    Planning
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-400 text-sm">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 font-sans scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Let&apos;s Connect
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Get in Touch
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I&apos;d love to hear from you. Let&apos;s create something amazing together!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-medium">Email</p>
                    <p className="text-slate-600 dark:text-slate-300">nguyen.sy.nguyen@example.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-medium">LinkedIn</p>
                    <p className="text-slate-600 dark:text-slate-300">/in/nguyen-sy-nguyen</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-medium">GitHub</p>
                    <p className="text-slate-600 dark:text-slate-300">/nguyen-sy-nguyen</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 font-mono"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 Nguyen Sy Nguyen. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
