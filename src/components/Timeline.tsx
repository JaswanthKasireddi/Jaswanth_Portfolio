/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, Briefcase, GraduationCap, ChevronRight, Award, Trophy } from 'lucide-react';
import { portfolioData, translations } from '../data';
import { Language } from '../types';

interface TimelineProps {
  language: Language;
}

export default function Timeline({ language }: TimelineProps) {
  const t = translations[language];
  const eduData = portfolioData.education;
  const expData = portfolioData.experience;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-alabaster border-t border-olive-100" id="experience-section">
      <div className="w-full max-w-7xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive-600">
            {language === 'en' ? 'Clinical Track & Milestones' : 'Lebenslauf & Qualifikationen'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-olive-950 font-display tracking-tight">
            {language === 'en' ? 'Education & Experience' : 'Ausbildung & Berufsetappe'}
          </h2>
          <div className="h-1 w-12 bg-olive-500 mx-auto rounded-full"></div>
        </div>

        {/* Two-Column Structured Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Work Experience Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-olive-150 pb-4">
              <span className="p-2.5 bg-olive-100 rounded-xl border border-olive-200 text-olive-750 shadow-sm">
                <Briefcase className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-olive-950 tracking-tight">
                  {language === 'en' ? 'Professional Medical Experience' : 'Klinische Praxiserfahrung'}
                </h3>
                <p className="text-xs text-olive-500 font-light mt-0.5">
                  {language === 'en' ? 'Hands-on clinical shifts and patient stewardship' : 'Direkte Patientenversorgung & kardiologische Notfälle'}
                </p>
              </div>
            </div>

            <div className="relative pl-4 sm:pl-6 border-l-2 border-olive-300 space-y-8 sm:space-y-10">
              {expData.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative space-y-3"
                >
                  {/* Timeline Node dot */}
                  <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-olive-600 shadow-sm" />

                  {/* Header metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-olive-600 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-olive-400" />
                      {exp.period}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-olive-100 border border-olive-200/50 text-[10px] font-mono font-bold text-olive-700 shadow-sm/5">
                      {exp.duration[language]}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-olive-900 leading-snug">
                      {exp.role[language]}
                    </h4>
                    <div className="text-xs text-olive-600 font-light mt-1 flex items-center gap-1.5">
                      <span className="font-bold text-olive-850">{exp.company}</span>
                      <span>•</span>
                      <span>{exp.location[language]}</span>
                    </div>
                  </div>

                  {/* Details box */}
                  <div className="p-5 rounded-2xl bg-white border border-olive-150 shadow-md text-olive-800 text-xs sm:text-sm font-light space-y-2">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-olive-400 font-bold">
                      {t.experience.department}: <span className="text-olive-700 font-semibold">{exp.department[language]}</span>
                    </div>
                    <ul className="space-y-2.5 pt-2 border-t border-olive-100">
                      {exp.bullets[language].map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-xs sm:text-sm leading-relaxed text-olive-700">
                          <ChevronRight className="w-4 h-4 text-olive-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Academic Path Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-olive-150 pb-4">
              <span className="p-2.5 bg-olive-100 rounded-xl border border-olive-200 text-olive-750 shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-olive-950 tracking-tight">
                  {language === 'en' ? 'Academic Credentials' : 'Akademische Laufbahn'}
                </h3>
                <p className="text-xs text-olive-500 font-light mt-0.5">
                  {language === 'en' ? 'Degree validation mapped to European standards' : 'Studiengänge und Zertifikate nach EQR/EQF'}
                </p>
              </div>
            </div>

            <div className="relative pl-4 sm:pl-6 border-l-2 border-olive-300 space-y-8 sm:space-y-10">
              {eduData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative space-y-3"
                >
                  {/* Timeline Node dot */}
                  <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-olive-500 shadow-sm" />

                  {/* Header metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-olive-600 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-olive-400" />
                      {edu.years}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-olive-100 border border-olive-200/50 text-[10px] font-mono font-bold text-olive-700 flex items-center gap-1 shadow-sm/5">
                      <Award className="w-3" />
                      EQF {edu.eqf}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-olive-900 leading-snug">
                      {edu.title[language]}
                    </h4>
                    <p className="text-xs font-bold text-olive-600 mt-1">
                      {edu.institution[language]}
                    </p>
                  </div>

                  {/* Details box */}
                  <div className="p-5 rounded-2xl bg-white border border-olive-150 shadow-md text-olive-800 font-light space-y-3">
                    <p className="text-xs sm:text-sm leading-relaxed text-olive-600">
                      {edu.details[language]}
                    </p>
                    <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-olive-100">
                      <span className="text-olive-400 font-bold">{t.education.gradesLabel}</span>
                      <span className="text-olive-700 font-bold bg-olive-50 px-2.5 py-1 rounded-lg border border-olive-150">
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
