"use client";

import { useEffect } from 'react';

import { useManagedTimeouts } from '@/hooks/useManagedTimeouts';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { useAnimationSequence } from '@/hooks/useAnimationSequence';
import { useInteractionBlocker } from '@/hooks/useInteractionBlocker';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

import CopyNotification from '@/components/ui/CopyNotification';
import InteractionOverlay from '@/components/ui/InteractionOverlay';
import Navbar from '@/components/ui/Navbar';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TimelineSection from '@/components/sections/TimelineSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const timeouts = useManagedTimeouts();

  const typing = useTypingAnimation(timeouts);
  const sequence = useAnimationSequence(typing.showButtons, timeouts);

  useInteractionBlocker(sequence.isAnimationsComplete);
  const mobileMenu = useMobileMenu(sequence.isAnimationsComplete);
  const clipboard = useCopyToClipboard(timeouts);

  useEffect(() => {
    return () => {
      timeouts.clearAllTimeouts();
    };
  }, [timeouts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 scroll-smooth">
      <CopyNotification show={clipboard.showCopyNotification} isVisible={clipboard.isNotificationVisible} />
      <InteractionOverlay isAnimationsComplete={sequence.isAnimationsComplete} />
      <Navbar showHeader={sequence.showHeader} showBackButton={sequence.showBackButton} mobileMenu={mobileMenu} />
      <HeroSection typing={typing} />
      <AboutSection />
      <TimelineSection />
      <ContactSection onCopyDiscord={clipboard.copyDiscordUsername} />
      <Footer />
    </div>
  );
}
