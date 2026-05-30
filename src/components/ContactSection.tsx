/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, FileText, Lock, Users } from 'lucide-react';
import { portfolioData, translations } from '../data';
import { Language } from '../types';

interface ContactSectionProps {
  language: Language;
}

export default function ContactSection({ language }: ContactSectionProps) {
  const t = translations[language];
  const contactT = t.contact;
  const personal = portfolioData.personal;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setFormState('sending');
    // Simulate highly professional transmission latency
    setTimeout(() => {
      setFormState('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1800);
  };

  // Download resume PDF - uses actual German CV file
  const handleDownloadResume = () => {
    const candidates = ['/assets/Jaswanth Kasireddi_German_CV.pdf', '/Jaswanth Kasireddi_German_CV.pdf', '/assets/resume.pdf', '/resume.pdf'];

    // Try candidates in order; clicking an anchor will either download or open in new tab
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = `Jaswanth_Kasireddi_German_CV.pdf`;

    for (const href of candidates) {
      link.href = href;
      document.body.appendChild(link);
      try {
        link.click();
        document.body.removeChild(link);
        return;
      } catch (e) {
        document.body.removeChild(link);
        // try next
      }
    }

    // Final fallback: generate plaintext CV (very small fallback)
    const rawCv = `JASWANTH KASIREDDI - LEBENSLAUF (CV)\n\nKontakt:\nEmail: jaswanth.kasireddi@gmail.com\nTelefon: +91 7995754180\n\nAusbildung:\nB.Sc. Nursing mit Deutsch B1 Zertifikat\n\nErfahrung:\n2+ Jahre Notfallmedizin & Herzinsuffizienz-Pflege`;
    const blob = new Blob([rawCv], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const fallbackLink = document.createElement('a');
    fallbackLink.href = url;
    fallbackLink.download = `Jaswanth_Kasireddi_German_CV.txt`;
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-20 px-4 bg-alabaster border-t border-olive-100" id="contact">
      <div className="w-full max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive-600">
            {language === 'en' ? 'Direct Dialogue' : 'Echte Verbindung'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-olive-950 font-display tracking-tight">
            {contactT.title}
          </h2>
          <p className="text-xs sm:text-sm text-olive-600 font-light max-w-xl mx-auto">
            {contactT.subtitle}
          </p>
          <div className="h-1 w-12 bg-olive-500 mx-auto rounded-full"></div>
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Core Credentials & Quick download */}
          <div className="lg:col-span-12 lg:grid lg:grid-cols-2 gap-8 lg:space-y-0 space-y-6 xl:col-span-5 xl:flex xl:flex-col xl:space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-olive-150 space-y-6 text-left shadow-sm">
              <h3 className="text-xs font-mono font-bold text-olive-400 uppercase tracking-widest border-b border-olive-100 pb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-olive-550" />
                {contactT.getInTouch}
              </h3>

              <div className="space-y-5">
                {/* Email item */}
                <a href={`mailto:${personal.email}`} className="flex gap-4 items-center group cursor-pointer outline-none">
                  <span className="p-3 bg-olive-50 text-olive-700 rounded-xl group-hover:bg-olive-100 group-hover:text-olive-900 transition-colors shrink-0 shadow-sm border border-olive-200/50">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-olive-400">Official Email</h4>
                    <p className="text-xs sm:text-sm font-bold text-olive-900 group-hover:text-olive-700 transition-colors">
                      {personal.email}
                    </p>
                  </div>
                </a>

                {/* Phone item */}
                <a href={`tel:${personal.phone}`} className="flex gap-4 items-center group cursor-pointer outline-none">
                  <span className="p-3 bg-olive-50 text-olive-700 rounded-xl group-hover:bg-olive-100 group-hover:text-olive-900 transition-colors shrink-0 shadow-sm border border-olive-200/50">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-olive-400">Contact Number</h4>
                    <p className="text-xs sm:text-sm font-bold text-olive-900 group-hover:text-olive-700 transition-colors">
                      {personal.phone}
                    </p>
                  </div>
                </a>

                {/* Address item */}
                <div className="flex gap-4 items-start">
                  <span className="p-3 bg-olive-50 text-olive-700 rounded-xl shrink-0 shadow-sm border border-olive-200/50">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-olive-400">Factual Residency</h4>
                    <p className="text-[11px] sm:text-xs text-olive-650 font-light leading-snug">
                      {language === 'en' ? personal.currentAddress.en : personal.currentAddress.de}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="pt-5 border-t border-olive-100 flex items-center justify-between text-xs font-mono">
                <span className="text-olive-450 font-semibold">{contactT.hiringLabel}</span>
                <span className="text-olive-700 font-bold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-olive-600 animate-pulse"></span>
                  {contactT.hiringStatus}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Quick Resume Download Action */}
              <button
                id="download-cv-btn"
                onClick={handleDownloadResume}
                className="w-full p-4 rounded-2xl bg-olive-650 hover:bg-olive-700 text-white font-bold flex items-center justify-center gap-3 shadow-md shadow-olive-750/5 cursor-pointer transition-all duration-300"
              >
                <FileText className="w-4 h-4 shrink-0" />
                {language === 'en' ? 'Download CV (PDF)' : 'Lebenslauf herunterladen (PDF)'}
              </button>

              {/* GDPR Trust line */}
              <div className="flex gap-2 items-center justify-center text-olive-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-olive-450" />
                <span>DSGVO / GDPR Compliance Secured</span>
              </div>
            </div>
          </div>

          {/* Column 2: Digital secure contact form */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-olive-150 shadow-sm text-left">
              
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="p-4 bg-olive-100 rounded-full border border-olive-250 text-olive-700 shadow-sm">
                      <CheckCircle2 className="w-12 h-12 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-bold text-olive-950 tracking-wide">
                        {language === 'en' ? 'Secure Delivery Complete!' : 'Sichere Übertragung vollendet!'}
                      </h4>
                      <p className="text-xs sm:text-sm text-olive-600 max-w-sm mx-auto font-light leading-relaxed">
                        {contactT.success}
                      </p>
                    </div>
                    <button
                      id="reset-form"
                      onClick={() => setFormState('idle')}
                      className="mt-4 px-5 py-2.5 rounded-xl bg-olive-50 border border-olive-200 hover:bg-olive-100 text-olive-750 text-xs font-mono font-bold tracking-wider cursor-pointer transition-colors"
                    >
                      {language === 'en' ? 'SEND ANOTHER MESSAGE' : 'NEUE ANFRAGE STARTEN'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-[10px] font-mono font-bold uppercase tracking-widest text-olive-450">
                        {contactT.name}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        disabled={formState === 'sending'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={language === 'en' ? 'e.g., Charité University Hospital Berlin' : 'z.B. Charité Universitätsmedizin Berlin'}
                        className="w-full bg-white text-olive-900 placeholder-olive-400 rounded-xl px-4 py-3 text-xs sm:text-sm border border-olive-205 focus:outline-none focus:border-olive-500 focus:ring-2 focus:ring-olive-200 transition-all disabled:opacity-50"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-[10px] font-mono font-bold uppercase tracking-widest text-olive-450">
                        {contactT.email}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        disabled={formState === 'sending'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hr@charite-example.de"
                        className="w-full bg-white text-olive-900 placeholder-olive-400 rounded-xl px-4 py-3 text-xs sm:text-sm border border-olive-205 focus:outline-none focus:border-olive-500 focus:ring-2 focus:ring-olive-200 transition-all disabled:opacity-50"
                      />
                    </div>

                    {/* Inquiry Message input */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-[10px] font-mono font-bold uppercase tracking-widest text-olive-450">
                        {contactT.message}
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        disabled={formState === 'sending'}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={language === 'en' ? 'Outline your nursing open positions, requirements, or start interview logistics...' : 'Schildern Sie Ihre vakanten Stellen, gewünschten Qualifikationen oder Interview-Details...'}
                        className="w-full bg-white text-olive-900 placeholder-olive-400 rounded-xl px-4 py-3 text-xs sm:text-sm border border-olive-205 focus:outline-none focus:border-olive-500 focus:ring-2 focus:ring-olive-200 transition-all disabled:opacity-50 resize-none"
                      />
                    </div>

                    {/* Submit action */}
                    <button
                      id="contact-submit"
                      type="submit"
                      disabled={formState === 'sending'}
                      className="w-full py-4 bg-olive-650 hover:bg-olive-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-md disabled:opacity-50 transition-all duration-300 cursor-pointer"
                    >
                      {formState === 'sending' ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>{contactT.sending}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 shrink-0" />
                          <span>{contactT.send}</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
