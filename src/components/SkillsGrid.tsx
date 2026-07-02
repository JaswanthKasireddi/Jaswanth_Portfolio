/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Activity, Heart, Globe, Flame, Star, Coffee } from 'lucide-react';
import { portfolioData, translations } from '../data';
import { Language } from '../types';

interface SkillsGridProps {
  language: Language;
}

export default function SkillsGrid({ language }: SkillsGridProps) {
  const t = translations[language];
  const skillsData = portfolioData.skills;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-olive-100" id="skills-section">
      <div className="w-full max-w-7xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive-600">
            {language === 'en' ? 'Professional Capability' : 'Berufliche Kompetenzen'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-olive-950 font-display tracking-tight">
            {t.skills.title}
          </h2>
          <p className="text-xs sm:text-sm text-olive-600 font-light max-w-xl mx-auto">
            {t.skills.subtitle}
          </p>
          <div className="h-1 w-12 bg-olive-500 mx-auto rounded-full"></div>
        </div>

        {/* Categories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Clinical Skills */}
          <div className="p-6 rounded-3xl bg-olive-50/50 border border-olive-150 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-olive-100 pb-4">
              <span className="p-2.5 bg-white text-olive-700 rounded-xl border border-olive-200/60 shadow-sm">
                <Activity className="w-5 h-5 animate-pulse" />
              </span>
              <h3 className="text-base font-bold text-olive-900 tracking-wide">
                {t.skills.clinical}
              </h3>
            </div>

            <div className="space-y-4">
              {skillsData.clinical[language].map((skill, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-olive-850 font-semibold">{skill}</span>
                    <span className="text-olive-600 font-mono text-[9px] font-bold uppercase tracking-wider">Validated</span>
                  </div>
                  <div className="h-1.5 w-full bg-olive-200/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                      className="h-full bg-gradient-to-r from-olive-750 to-olive-550 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="p-6 rounded-3xl bg-olive-50/50 border border-olive-150 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-olive-100 pb-4">
              <span className="p-2.5 bg-white text-olive-700 rounded-xl border border-olive-200/60 shadow-sm">
                <Heart className="w-5 h-5" />
              </span>
              <h3 className="text-base font-bold text-olive-900 tracking-wide">
                {t.skills.soft}
              </h3>
            </div>

            <div className="space-y-4">
              {skillsData.soft[language].map((skill, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="p-1.5 bg-white rounded-lg border border-olive-200/65 text-olive-600 shrink-0 mt-0.5 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-current text-olive-605" />
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-olive-850">
                      {skill}
                    </h4>
                    <p className="text-[11px] text-olive-550 font-light mt-0.5">
                      {language === 'en' ? 'Demonstrated on emergency cardiological wards' : 'Täglich angewandt im kardiologischen Schichtbetrieb'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Profile */}
          <div className="p-6 rounded-3xl bg-olive-50/50 border border-olive-150 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-olive-100 pb-4">
              <span className="p-2.5 bg-white text-olive-700 rounded-xl border border-olive-200/60 shadow-sm">
                <Globe className="w-5 h-5" />
              </span>
              <h3 className="text-base font-bold text-olive-900 tracking-wide">
                {t.skills.languages}
              </h3>
            </div>

            <div className="space-y-6">
              {skillsData.languages.map((lang, index) => (
                <div key={index} className="p-4 rounded-2xl bg-white border border-olive-150 space-y-3 shadow-md/5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-bold text-olive-900 flex items-center gap-2">
                      <span className="text-sm">
                        {lang.name === 'Telugu' ? '🇮🇳' : lang.name === 'English' ? '🇬🇧' : '🇩🇪'}
                      </span>
                      {lang.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-olive-100 border border-olive-200 text-[10px] font-mono font-bold text-olive-700">
                      {lang.cefr}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-olive-400">
                      <span>{t.skills.cefrLevel}</span>
                      <span className="text-olive-705 font-semibold">{lang.level[language]}</span>
                    </div>
                    {/* Progress indicator */}
                    <div className="h-1.5 w-full bg-olive-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: lang.cefr === 'Native' ? '100%' : lang.cefr === 'B2' ? '85%' : '65%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-olive-700 to-olive-550"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
