'use client';

import Link from "next/link";
import Image from "next/image";
import { ScrollProvider, useScroll } from "@/context/ScrollContext";
import { Menu, X, Download, BookOpen, CreditCard } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const { scrollToSection, downloadsRef, tutorialsRef, tokensRef } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (ref: React.RefObject<HTMLElement>) => {
    scrollToSection(ref);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/lgo220x50-new.png" 
            alt="NiNJA Logo" 
            width={160} 
            height={36} 
            className="h-auto"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection(downloadsRef)} className="text-sm hover:text-primary transition-colors">
            Downloads
          </button>
          <button onClick={() => scrollToSection(tutorialsRef)} className="text-sm hover:text-primary transition-colors">
            Tutorials
          </button>
          <button onClick={() => scrollToSection(tokensRef)} className="text-sm hover:text-primary transition-colors">
            Purchase
          </button>
          <Link href="https://dsc.gg/xbninja" className="neon-button flex items-center gap-2 font-greater-theory">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join Discord
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-accent/50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        <div 
          className={`absolute top-16 right-4 w-72 bg-background border border-border rounded-xl shadow-xl transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}
        >
          <div className="p-3">
            <div className="flex flex-col">
              <button 
                onClick={() => handleNavClick(downloadsRef)} 
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors py-2.5 px-3 rounded-lg hover:bg-accent/10 group"
              >
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                Downloads
              </button>
              <button 
                onClick={() => handleNavClick(tutorialsRef)} 
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors py-2.5 px-3 rounded-lg hover:bg-accent/10 group"
              >
                <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                Tutorials
              </button>
              <button 
                onClick={() => handleNavClick(tokensRef)} 
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors py-2.5 px-3 rounded-lg hover:bg-accent/10 group"
              >
                <CreditCard className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                Purchase
              </button>
              <div className="h-px bg-border my-1.5" />
              <Link 
                href="https://dsc.gg/xbninja" 
                className="neon-button flex items-center justify-center gap-2 font-greater-theory py-2.5 px-3 rounded-lg mt-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollProvider>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </ScrollProvider>
  );
} 