/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Heart, Landmark, HelpCircle, Activity } from 'lucide-react';
import { portfolioData, translations } from '../data';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language];
  const data = portfolioData.personal;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-olive-100" id="about-section">
      <div className="w-full max-w-7xl mx-auto space-y-10 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive-600">
            {language === 'en' ? 'Professional Identity' : 'Berufliche Identität'}
          </span>
          <h2 className="text-3.5xl sm:text-3xl md:text-4xl font-extrabold text-olive-950 font-display tracking-tight">
            {t.about.title}
          </h2>
          <div className="h-1 w-12 bg-olive-500 mx-auto rounded-full"></div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Detailed Biography Text */}
          <div className="lg:col-span-8 space-y-6 text-olive-850">
            <p className="text-base sm:text-lg font-light leading-relaxed">
              {t.about.text1}
            </p>
            <p className="text-sm sm:text-base font-light leading-relaxed text-olive-600">
              {t.about.text2}
            </p>

            {/* Philosophy Box */}
            <div className="relative p-6 rounded-2xl bg-olive-50 border border-olive-150/60 shadow-sm overflow-hidden">
              <div className="absolute top-4 right-4 text-olive-200/30">
                <Heart className="w-12 h-12 stroke-[1.5]" />
              </div>
              <div className="flex gap-4 items-start relative z-10">
                <span className="p-2.5 bg-white rounded-xl border border-olive-200/60 text-olive-600 mt-1 shadow-sm">
                  <Activity className="w-5 h-5 animate-pulse" />
                </span>
                <div>
                  <h4 className="text-xs font-mono font-bold text-olive-800 uppercase tracking-wider mb-1.5">
                    {t.about.philosophyTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-olive-750 leading-relaxed font-light italic">
                    "{t.about.philosophyText}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics (Premium Matte Cards) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-olive-150 shadow-sm space-y-1.5 transition-all duration-300 hover:shadow-md hover:border-olive-200">
              <span className="text-[10px] font-mono font-bold tracking-widest text-olive-400 uppercase">
                {t.about.keyFact1}
              </span>
              <div className="text-2xl font-bold text-olive-950 font-display">
                {t.about.keyFact1Val}
              </div>
              <p className="text-[11px] text-olive-550 leading-normal font-light">
                {language === 'en' 
                  ? 'Representing standard-setting performance in clinical and theoretical nursing curricula.' 
                  : 'Belegt hervorragende theoretische und klinische Studienleistungen.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-olive-150 shadow-sm space-y-1.5 transition-all duration-300 hover:shadow-md hover:border-olive-200">
              <span className="text-[10px] font-mono font-bold tracking-widest text-olive-400 uppercase">
                {t.about.keyFact2}
              </span>
              <div className="text-2xl font-bold text-olive-750 font-display">
                {t.about.keyFact2Val}
              </div>
              <p className="text-[11px] text-olive-550 leading-normal font-light">
                {language === 'en'
                  ? 'Intensive nursing on emergency and hemodynamically critical cardiology wards.'
                  : 'Praxisschwerpunkt in der Akut- und Notfallversorgung kardiologischer Patienten.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-olive-150 shadow-sm space-y-1.5 transition-all duration-300 hover:shadow-md hover:border-olive-200">
              <span className="text-[10px] font-mono font-bold tracking-widest text-olive-400 uppercase">
                {t.about.keyFact3}
              </span>
              <div className="text-2xl font-bold text-olive-850 font-display">
                {t.about.keyFact3Val}
              </div>
              <p className="text-[11px] text-olive-550 leading-normal font-light">
                {language === 'en'
                  ? 'Completed official B2 certificate, proving everyday and clinical communication fluency.'
                  : 'Offizielle B2-Zertifizierung erfolgreich absolviert. Bereit für fließende Patientenkommunikation und fehlerfreie Dokumentation.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
