'use client';

import clsx from 'clsx';
import { navItems } from '@/data/navigation';
import { scrollToSection } from '@/utils/scrollToSection';
import type { MobileMenuState } from '@/types';

interface NavbarProps {
  showHeader: boolean;
  showBackButton: boolean;
  mobileMenu: MobileMenuState;
}

export default function Navbar({ showHeader, showBackButton, mobileMenu }: NavbarProps) {
  const { isMobileMenuOpen, toggleMobileMenu, mobileMenuRef, mobileMenuButtonRef } = mobileMenu;

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId, () => {
      if (isMobileMenuOpen) toggleMobileMenu();
    });
  };

  return (
    <nav
      className={clsx(
        'fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-50 h-16 transition-transform duration-700',
        { 'translate-y-0': showHeader, '-translate-y-full': !showHeader },
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Back to Hub */}
          <a
            href="https://kaitojd.me"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-900 dark:text-white font-mono hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-500 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
              { 'translate-x-0 opacity-100': showBackButton, 'translate-x-8 opacity-0': !showBackButton },
            )}
          >
            <span className="text-emerald-600 dark:text-emerald-400">&lt;&lt;</span>
            <span className="hidden sm:inline">{' '}Back to Hub</span>
            <span className="sm:hidden">{' '}Back to Hub</span>
          </a>

          {/* Desktop Menu */}
          <div
            className={clsx(
              'hidden md:flex space-x-4 lg:space-x-8 transition-all duration-500 delay-200',
              { 'opacity-100 translate-y-0': showHeader, 'opacity-0 translate-y-2': !showHeader },
            )}
          >
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3 lg:px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm lg:text-base"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div
            className={clsx(
              'md:hidden relative transition-all duration-500 delay-200',
              { 'opacity-100 translate-y-0': showHeader, 'opacity-0 translate-y-2': !showHeader },
            )}
          >
            <button
              ref={mobileMenuButtonRef}
              className="mobile-menu-button p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mobile Dropdown */}
            <div
              id="mobile-menu"
              ref={mobileMenuRef}
              className={clsx(
                'mobile-menu absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-200 origin-top-right transform',
                { 'opacity-100 visible scale-100': isMobileMenuOpen, 'opacity-0 invisible scale-95': !isMobileMenuOpen },
              )}
            >
              <div className="py-2">
                {navItems.map((item) => (
                  <button
                    key={item.sectionId}
                    onClick={() => handleNavClick(item.sectionId)}
                    className="block w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
