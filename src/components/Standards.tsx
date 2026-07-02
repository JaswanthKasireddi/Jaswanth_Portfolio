/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle, Scale, GraduationCap, Languages } from 'lucide-react';
import { translations } from '../data';
import { Language } from '../types';

interface StandardsProps {
  language: Language;
}

export default function Standards({ language }: StandardsProps) {
  const t = translations[language];

  return (
    <section className="py-20 px-4 bg-alabaster border-t border-olive-100 relative overflow-hidden" id="standards-section">
      {/* Background graphic stripes symbolizing reliability and stability */}
      <div className="absolute right-0 top-0 bottom-0 w-32 opacity-[0.03] pointer-events-none bg-gradient-to-l from-olive-600 to-transparent"></div>

      <div className="w-full max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive-600 flex items-center justify-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-olive-500" />
            {language === 'en' ? 'Institutional Trustworthiness' : 'Institutionelle Eignung'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-olive-950 font-display tracking-tight">
            {t.standards.title}
          </h2>
          <p className="text-xs sm:text-sm text-olive-600 font-light max-w-xl mx-auto">
            {t.standards.subtitle}
          </p>
          <div className="h-1 w-12 bg-olive-500 mx-auto rounded-full"></div>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Equals Pflegefachmann */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-white border border-olive-150 hover:border-olive-300 transition-colors duration-300 space-y-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <span className="p-2.5 bg-olive-50 text-olive-700 rounded-xl border border-olive-200/60 shadow-sm">
                <Scale className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-olive-100 text-[9px] font-mono font-bold text-olive-700 border border-olive-200">
                {language === 'en' ? 'Anerkennung' : 'Pflegeberufegesetz'}
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-olive-900 tracking-wide">
                {t.standards.recognitionTitle}
              </h3>
              <p className="text-xs sm:text-sm text-olive-600 font-light mt-2 leading-relaxed">
                {t.standards.recognitionText}
              </p>
            </div>
          </motion.div>

          {/* Card 2: EQF Level 6 Equivalent */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl bg-white border border-olive-150 hover:border-olive-300 transition-colors duration-300 space-y-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <span className="p-2.5 bg-olive-50 text-olive-700 rounded-xl border border-olive-200/60 shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-olive-100 text-[9px] font-mono font-bold text-olive-700 border border-olive-200">
                {language === 'en' ? 'B.Sc. Equivalence' : 'Hochschulniveau'}
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-olive-900 tracking-wide">
                {t.standards.eqfHighlight}
              </h3>
              <p className="text-xs sm:text-sm text-olive-600 font-light mt-2 leading-relaxed">
                {t.standards.eqfText}
              </p>
            </div>
          </motion.div>

          {/* Card 3: CEFR Language certifications */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl bg-white border border-olive-150 hover:border-olive-300 transition-colors duration-300 space-y-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <span className="p-2.5 bg-olive-50 text-olive-700 rounded-xl border border-olive-200/60 shadow-sm">
                <Languages className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-olive-100 text-[9px] font-mono font-bold text-olive-700 border border-olive-200">
                {language === 'en' ? 'CEFR Level B2' : 'Deutsch B2'}
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-olive-900 tracking-wide">
                {t.standards.languageCertTitle}
              </h3>
              <p className="text-xs sm:text-sm text-olive-600 font-light mt-2 leading-relaxed">
                {t.standards.languageCertText}
              </p>
            </div>
          </motion.div>

        </div>

        {/* Process Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-olive-150 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-left">
            <h4 className="text-base font-bold text-olive-950 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-olive-500 animate-pulse"></span>
              {language === 'en' ? 'Direct Application Flow Initiated' : 'Direkte Bewerbungsunterstützung'}
            </h4>
            <p className="text-xs sm:text-sm text-olive-600 font-light">
              {language === 'en' 
                ? 'Under the German Skilled Immigration Act (Fachkräfteeinwanderungsgesetz), hiring can proceed swiftly with fast-track procedures.' 
                : 'Im Rahmen des Fachkräfteeinwanderungsgesetzes können Anstellungsverfahren durch das beschleunigte Verfahren verkürzt werden.'}
            </p>
          </div>
          <span className="px-6 py-2.5 rounded-xl bg-olive-100 border border-olive-200 text-xs font-semibold text-olive-850 tracking-wide uppercase shadow-sm/5">
            {t.standards.statusBadge}
          </span>
        </div>

      </div>
    </section>
  );
}
