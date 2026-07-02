/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, HeartPulse, Stethoscope, GraduationCap, ShieldCheck, Mail, Bot, Languages, ArrowDown } from 'lucide-react';
import { portfolioData, translations } from '../data';
import { Language } from '../types';

// @ts-ignore
import jaswanthProfile from '../../assets/Jaswanth_Portfolio.jpeg';

interface HeroProps {
  language: Language;
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ language, onScrollToSection }: HeroProps) {
  const t = translations[language];

  // Dynamic image loaders with the uploaded profile photo as primary
  const [imageSrc, setImageSrc] = useState<string>(jaswanthProfile || '/assets/Jaswanth_Portfolio.jpeg');
  const [imageErrCount, setImageErrCount] = useState<number>(0);

  const handleImageError = () => {
    const errorChain = [
      jaswanthProfile,
      '/assets/Jaswanth_Portfolio.jpeg',
      '/assets/brother_photo.png',
      '/assets/brother_photo.jpg',
      '/assets/brother_photo.jpeg',
      '/assets/Kasireddi_brother_photo.jpg',
      '/assets/profile.jpg',
      '/assets/profile.png',
      '/brother_photo.png',
      '/brother_photo.jpg',
      '/brother_photo.jpeg',
      '/Kasireddi_brother_photo.jpg',
      '/profile.jpg',
      '/profile.png'
    ];
    
    if (imageErrCount < errorChain.length - 1) {
      const nextIndex = imageErrCount + 1;
      setImageSrc(errorChain[nextIndex]);
      setImageErrCount(nextIndex);
    } else {
      setImageErrCount(errorChain.length); // Render the high-fidelity professional fallback SVG
    }
  };

  const getAttrIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Activity className="w-4 h-4 text-olive-650 animate-pulse" />;
      case 1:
        return <Stethoscope className="w-4 h-4 text-olive-650" />;
      case 2:
        return <Languages className="w-4 h-4 text-olive-650" />;
      case 3:
        return <GraduationCap className="w-4 h-4 text-olive-650" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-olive-650" />;
    }
  };

  // Professional characteristics that fade or cycle
  const attributes = language === 'en' 
    ? ['Emergency Operations', 'Heart Failure Care', 'CEFR B1 Deutsch', 'Graduated B.Sc.']
    : ['Notfallmedizin', 'Herzinsuffizienz-Pflege', 'Deutsch B1 Zertifikat', 'Akademischer B.Sc.'];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 py-8 lg:py-16 overflow-hidden bg-gradient-to-b from-olive-50/60 via-alabaster to-alabaster" id="hero-section">
      {/* ECG Heartbeat Line Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <svg
          className="w-full max-w-7xl h-64 text-olive-300"
          viewBox="0 0 1000 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M 0 100 L 250 100 L 270 100 L 290 60 L 310 140 L 330 100 L 340 100 L 350 40 L 360 160 L 370 100 L 390 100"
            className="animate-pulse"
            style={{ strokeDasharray: '1000', strokeDashoffset: '0' }}
          />
          <path
            d="M 390 100 L 590 100 L 610 60 L 630 140 L 650 100 L 660 100 L 670 40 L 680 160 L 690 100 L 710 100 L 1000 100"
            className="animate-pulse"
            style={{ strokeDasharray: '1000', strokeDashoffset: '0', animationDelay: '1.5s' }}
          />
        </svg>
      </div>

      {/* Floating 3D/Glass Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-olive-200/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '10s' }}></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-olive-100/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-olive-200/50 text-olive-850 text-xs font-semibold backdrop-blur-sm shadow-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-olive-500"></span>
            </span>
            <span className="text-olive-605 font-bold">{t.hero.greeting}!</span> {t.hero.badge}
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-olive-950 font-display leading-[1.1]"
            >
              Jaswanth <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-olive-800 via-olive-750 to-olive-600">
                Kasireddi
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-olive-800 max-w-2xl font-light leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>
          </div>

          {/* Core attributes ticking badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2.5 pt-2"
          >
            {attributes.map((attr, idx) => (
              <span 
                key={idx} 
                className="px-3.5 py-1.5 rounded-xl bg-white border border-olive-150 text-xs font-mono font-medium text-olive-700 flex items-center gap-1.5 shadow-sm/5"
              >
                {getAttrIcon(idx)} {attr}
              </span>
            ))}
          </motion.div>

          {/* CTA Button Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              id="cta-connect"
              onClick={() => onScrollToSection('contact')}
              className="px-8 py-3.5 bg-olive-700 hover:bg-olive-600 text-white font-semibold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-olive-700/15 hover:shadow-olive-700/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm border-none"
            >
              <Mail className="w-4 h-4" />
              {t.hero.ctaPrimary}
            </button>

            <button
              id="cta-ai-twin"
              onClick={() => onScrollToSection('ai-twin')}
              className="px-8 py-3.5 bg-white hover:bg-olive-50 text-olive-800 hover:text-olive-900 font-semibold rounded-xl border border-olive-200 flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              <Bot className="w-4 h-4 text-olive-600 animate-pulse" />
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>

        {/* Right Premium Portrait Column (Paper-Matte Frame) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative w-full max-w-[340px] group"
          >
            {/* Soft Ambient Inner Glow */}
            <div className="absolute inset-0 bg-olive-100/10 rounded-[32px] blur-xl opacity-60 pointer-events-none transition-all group-hover:scale-105 duration-500"></div>

            {/* Premium Matte Card Frame with Double Deck Border */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative p-6 rounded-[32px] bg-[#fbfcfb] border border-olive-200/60 shadow-lg shadow-olive-900/5 hover:shadow-xl hover:shadow-olive-900/10 space-y-6 transition-all duration-300"
            >
              {/* Card Title Header with Verification Dots */}
              <div className="flex justify-between items-center border-b border-olive-100/60 pb-3">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-olive-600/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-olive-250"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-olive-150"></span>
                </div>
                <div className="text-[10px] font-mono text-olive-600 font-bold tracking-wider">
                  REG. STATE: AP/JK-{portfolioData.personal.dob.replace(/\//g, '')}
                </div>
              </div>

              {/* Portrait Matte Frame wrapper */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#f5f6f4] to-[#ebece9] border border-olive-205 shadow-inner flex flex-col justify-center items-center group/portrait transition-all duration-300">
                <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent z-0"></div>
                
                {imageErrCount < 12 ? (
                  <img
                    src={imageSrc}
                    alt="Jaswanth Kasireddi"
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300 z-10"
                  />
                ) : (
                  /* SVG Portrait of Jaswanth (Polished to look extremely professional & aesthetic, matching his uploaded photo) */
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-44 h-44 text-olive-850 drop-shadow-md relative">
                      {/* Glowing back-ring indicating clinical/academic status */}
                      <circle cx="60" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-olive-350/40" />
                      
                      {/* Tailored Maroon/Burgundy suit jacket and lapels matching the photo */}
                      <path d="M22 108 C 26 78, 42 72, 60 72 C 78 72, 94 78, 98 108 Z" fill="#800020" />
                      
                      {/* High quality suit lapel contours & elegant white formal shirt fold */}
                      <path d="M48 72 L 60 92 L 72 72 M52 73 L 60 88 L 68 73" fill="#ffffff" />
                      {/* Inner shirt collar stitches */}
                      <path d="M50 72 L 60 92 M70 72 L 60 92" stroke="#e2e8f0" strokeWidth="0.8" />
                      <path d="M40 72 L 52 90 L 46 108 M80 72 L 68 90 L 74 108" stroke="#66001a" strokeWidth="1" fill="none" />
                      
                      {/* Small silk blue pocket square for elegant professional flair */}
                      <polygon points="38,84 44,81 46,85 41,88" fill="#52829c" />

                      {/* Clean Neck */}
                      <rect x="54" y="58" width="12" height="15" fill="#fbcfe8" rx="1.5" />
                      
                      {/* Professional Head Outline */}
                      <ellipse cx="60" cy="46" rx="19.5" ry="21.5" fill="#fbcfe8" />
                      
                      {/* Styled Black Hair (neatly parted and styled with structure) */}
                      <path d="M39 41 C 39 26, 81 26, 81 41 C 74 29, 60 29, 39 41 Z" fill="#1b2230" />
                      <path d="M39 41 C 42 32, 58 31, 60 34 Q 65 30 81 41 C 81 30, 77 23, 60 23 C 43 23, 39 30, 39 41 Z" fill="#0c111d" />
                      
                      {/* Modern Thin-rimmed Black Glasses (Perfect round-oval design) */}
                      <rect x="44.5" y="42" width="12.5" height="9.5" rx="2.5" fill="none" stroke="#000000" strokeWidth="1.3" />
                      <rect x="63" y="42" width="12.5" height="9.5" rx="2.5" fill="none" stroke="#000000" strokeWidth="1.3" />
                      <line x1="57" y1="46" x2="63" y2="46" stroke="#000000" strokeWidth="1.5" />
                      <line x1="39.5" y1="45.5" x2="44.5" y2="45.5" stroke="#000000" strokeWidth="0.8" />
                      <line x1="75.5" y1="45.5" x2="80.5" y2="45.5" stroke="#000000" strokeWidth="0.8" />

                      {/* Groomed Mustache and French beard precisely styled as in photo */}
                      <path d="M51.5 53 Q 60 50.5 68.5 53" fill="none" stroke="#1b2230" strokeWidth="1.8" strokeLinecap="round" />
                      {/* Beard contour connecting from chin to mustache corners */}
                      <path d="M51 53 Q 48 65 60 67 Q 72 65 69 53 Q 60 59 51 53" fill="none" stroke="#1b2230" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M52 56 Q 60 61 68 56 Q 60 65 52 56" fill="#1b2230" />
                      
                      {/* Eyes and Eyebrows */}
                      <path d="M46.5 37.5 Q 50.5 35.5 54.5 37.5" fill="none" stroke="#0c111d" strokeWidth="1.3" />
                      <path d="M65.5 37.5 Q 69.5 35.5 73.5 37.5" fill="none" stroke="#0c111d" strokeWidth="1.3" />
                      <circle cx="51" cy="46.5" r="1.3" fill="#000000" />
                      <circle cx="69" cy="46.5" r="1.3" fill="#000000" />
                      
                      {/* Subtle, friendly smile */}
                      <path d="M55 52.5 Q 60 55.5 65 52.5" fill="none" stroke="#0c111d" strokeWidth="1.2" />
                    </svg>
                  </div>
                )}

                {/* Status Overlay Badge on bottom of the portrait */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#fbfcfb]/95 border border-olive-200 px-3 py-1.5 rounded-xl flex items-center justify-between text-[10px] font-mono tracking-wider text-olive-800 z-20 shadow-sm backdrop-blur-md">
                  <span className="flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-olive-600 animate-pulse" />
                    EQF LEVEL 6
                  </span>
                  <span className="text-olive-200">|</span>
                  <span className="text-olive-750 font-bold flex items-center gap-1.5">
                    <Languages className="w-3 h-3 text-olive-650" /> GERMANY B1+
                  </span>
                </div>
              </div>

              {/* Verified Handwriting Signature (Tucked beautifully under the photo) */}
              <div className="pt-1.5 text-center border-t border-olive-100/60">
                <div className="text-[9px] font-mono font-bold text-olive-400 uppercase tracking-widest mb-1.5">
                  Verified Practitioner Core ID
                </div>
                <div className="h-9 flex items-center justify-center text-olive-900 opacity-90">
                  <svg viewBox="0 0 150 40" className="h-7 w-32 stroke-olive-850" fill="none" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M 12 25 C 10 15, 18 10, 22 20 C 24 25, 20 32, 19 35 C 18 36, 17 38, 16 39 M 22 28 C 26 23, 29 20, 33 22 C 34 22, 33 29, 36 29 C 39 29, 41 23, 44 23 C 46 23, 44 28, 47 28 C 50 28, 52 24, 55 24 C 57 24, 56 29, 59 29 Q 62 29 65 24 C 67 24, 66 29, 70 29 C 74 29, 78 18, 79 12 C 79 12, 78 28, 81 28 C 84 28, 88 18, 90 15 C 91 15, 87 23, 93 29 M 102 24 C 110 24, 114 20, 118 18 M 126 24 C 126 24, 126 25, 126 25" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust factors Section bar */}
      <div className="w-full max-w-7xl mx-auto mt-16 pt-8 border-t border-olive-150 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-4 text-left max-w-md">
          <div className="p-3 bg-olive-100 rounded-xl border border-olive-200 text-olive-750">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-olive-900 uppercase tracking-wider">{t.hero.trustTitle}</h4>
            <p className="text-xs text-olive-600 mt-1 leading-normal font-light">{t.hero.trustText}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 justify-items-center w-full md:w-auto">
          <div className="text-center">
            <div className="text-2xl font-black font-display text-olive-900">B.Sc.</div>
            <div className="text-[10px] font-mono font-bold text-olive-400 uppercase tracking-widest mt-1">NURSING DEGREE</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black font-display text-olive-700">2 YEARS</div>
            <div className="text-[10px] font-mono font-bold text-olive-400 uppercase tracking-widest mt-1">EMERGENCY EXP.</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black font-display text-olive-600">B1 GER</div>
            <div className="text-[10px] font-mono font-bold text-olive-400 uppercase tracking-widest mt-1">ACTIVE LEARNER</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-2 flex flex-col items-center gap-1 animate-bounce cursor-pointer opacity-70 hover:opacity-100" onClick={() => onScrollToSection('about-section')}>
        <span className="text-[9px] font-mono tracking-widest text-olive-400 uppercase font-bold">Scroll Explore</span>
        <ArrowDown className="w-3.5 h-3.5 text-olive-400" />
      </div>
    </section>
  );
}
