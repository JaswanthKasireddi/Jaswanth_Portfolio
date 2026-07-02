/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Heart, Menu, X, Bot, FileText, CheckCircle2 } from 'lucide-react';
import { portfolioData, translations } from './data';
import { Language } from './types';
import LanguageSelector from './components/LanguageSelector';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Timeline from './components/Timeline';
import SkillsGrid from './components/SkillsGrid';
import Standards from './components/Standards';
import AIChatBot from './components/AIChatBot';
import ContactSection from './components/ContactSection';

export default function App() {
  const [language, setLanguage] = useState<Language>('de');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-alabaster text-olive-950 font-sans selection:bg-olive-200 selection:text-olive-900" id="app-root-container">
      {/* Sleek Fixed Header Banner */}
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-alabaster/80 backdrop-blur-md border-olive-100 py-3 shadow-md/5'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with pulsating health node */}
          <div
            id="nav-brand-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="p-2 bg-gradient-to-tr from-olive-600 to-olive-500 rounded-xl text-white shadow-md shadow-olive-600/20 group-hover:scale-105 transition-all duration-300">
              <Heart className="w-4.5 h-4.5 animate-heartbeat" />
            </span>
            <div className="text-left font-display">
              <div className="text-sm font-bold tracking-tight text-olive-950 group-hover:text-olive-600 transition-colors">
                Jaswanth K.
              </div>
              <div className="text-[9px] font-mono tracking-widest text-olive-400 uppercase">
                {language === 'en' ? 'B.Sc. Nursing' : 'Pflegefachkraft'}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5" id="desktop-nav-links">
            <button id="nav-about" onClick={() => scrollToSection('about-section')} className="px-3 py-1.5 text-xs font-semibold text-olive-700 hover:text-olive-950 transition-colors cursor-pointer rounded-lg hover:bg-olive-100/40">
              {t.nav.about}
            </button>
            <button id="nav-experience" onClick={() => scrollToSection('experience-section')} className="px-3 py-1.5 text-xs font-semibold text-olive-700 hover:text-olive-950 transition-colors cursor-pointer rounded-lg hover:bg-olive-100/40">
              {t.nav.experience}
            </button>
            <button id="nav-skills" onClick={() => scrollToSection('skills-section')} className="px-3 py-1.5 text-xs font-semibold text-olive-700 hover:text-olive-950 transition-colors cursor-pointer rounded-lg hover:bg-olive-100/40">
              {t.nav.skills}
            </button>
            <button id="nav-standards" onClick={() => scrollToSection('standards-section')} className="px-3 py-1.5 text-xs font-semibold text-olive-700 hover:text-olive-950 transition-colors cursor-pointer rounded-lg hover:bg-olive-100/40">
              {t.nav.germanStandards}
            </button>
            <button id="nav-ai-twin" onClick={() => scrollToSection('ai-twin')} className="px-3.5 py-1.5 text-xs font-semibold text-olive-700 hover:text-olive-900 bg-olive-100/50 border border-olive-200/50 rounded-lg hover:bg-olive-200/40 transition-all cursor-pointer flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-olive-600" />
              {t.nav.aiTwin}
            </button>
            <button id="nav-contact" onClick={() => scrollToSection('contact')} className="px-3.5 py-1.5 text-xs font-semibold text-white bg-olive-600 hover:bg-olive-700 rounded-lg shadow-md cursor-pointer transition-colors border-none">
              {t.nav.contact}
            </button>
          </nav>

          {/* Language Selector & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-olive-600 hover:text-olive-800 bg-olive-100/50 border border-olive-200/50 rounded-xl cursor-pointer outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="lg:hidden fixed inset-0 top-[60px] z-40 bg-alabaster/98 backdrop-blur-lg flex flex-col p-6 space-y-4 border-t border-olive-150">
          <button onClick={() => scrollToSection('about-section')} className="text-left py-3 text-sm font-medium text-olive-800 border-b border-olive-100/55">
            {t.nav.about}
          </button>
          <button onClick={() => scrollToSection('experience-section')} className="text-left py-3 text-sm font-medium text-olive-800 border-b border-olive-100/55">
            {t.nav.experience}
          </button>
          <button onClick={() => scrollToSection('skills-section')} className="text-left py-3 text-sm font-medium text-olive-800 border-b border-olive-100/55">
            {t.nav.skills}
          </button>
          <button onClick={() => scrollToSection('standards-section')} className="text-left py-3 text-sm font-medium text-olive-800 border-b border-olive-100/55">
            {t.nav.germanStandards}
          </button>
          <button onClick={() => scrollToSection('ai-twin')} className="text-left py-3 text-sm font-semibold text-olive-600 border-b border-olive-100/55 flex items-center gap-2">
            <Bot className="w-4 h-4" />
            {t.nav.aiTwin}
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-center py-4 bg-olive-600 hover:bg-olive-550 rounded-xl font-semibold text-white transition-colors">
            {t.nav.contact}
          </button>
        </div>
      )}

      {/* Main Core View Modules */}
      <main className="pt-[74px]">
        {/* Render Sections */}
        <Hero language={language} onScrollToSection={scrollToSection} />
        <AboutSection language={language} />
        <Timeline language={language} />
        <SkillsGrid language={language} />
        <Standards language={language} />
        <AIChatBot language={language} />
        <ContactSection language={language} />
      </main>

      {/* Humble Footer */}
      <footer className="py-12 px-4 border-t border-olive-100 bg-olive-50 text-olive-500 text-center text-xs space-y-4" id="portfolio-footer">
        <div className="flex justify-center items-center gap-1.5 text-olive-800">
          <Heart className="w-4 h-4 text-olive-600 fill-current animate-heartbeat" />
          <span className="font-semibold tracking-tight">Jaswanth Kasireddi Portfolio</span>
        </div>
        <p className="font-light max-w-md mx-auto text-olive-600 leading-relaxed">
          {language === 'en'
            ? 'Fully structured personal showcase conforming to German professional recruitment standards. All factual statements are backed by formal certifications.'
            : 'Strukturierte persönliche Präsentation nach deutschen klinischen Standards. Alle Angaben sind durch offizielle Krankenpflege-Zertifikate belegt.'}
        </p>
        <div className="pt-4 text-[10px] font-mono tracking-widest text-olive-400 uppercase">
          © {new Date().getFullYear()} Jaswanth Kasireddi. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
