'use client';

import React, { createContext, useContext, useRef } from 'react';
import { animate } from 'framer-motion';

type ScrollContextType = {
  downloadsRef: React.RefObject<HTMLElement>;
  tutorialsRef: React.RefObject<HTMLElement>;
  tokensRef: React.RefObject<HTMLElement>;
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const downloadsRef = useRef<HTMLElement>(null);
  const tutorialsRef = useRef<HTMLElement>(null);
  const tokensRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const yOffset = -100; // Offset for navbar height
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      animate(window.scrollY, y, {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        onUpdate: (latest) => {
          window.scrollTo(0, latest);
        },
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ downloadsRef, tutorialsRef, tokensRef, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
} 