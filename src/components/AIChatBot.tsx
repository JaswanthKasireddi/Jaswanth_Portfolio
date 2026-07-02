/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Sparkles, User, MessageCircle } from 'lucide-react';
import { translations } from '../data';
import { Language } from '../types';

interface AIChatBotProps {
  language: Language;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AIChatBot({ language }: AIChatBotProps) {
  const t = translations[language].aiTwin;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: t.welcomeMsg,
      timestamp: new Date().toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Richer interactive question chips representing different recruiter-friendly query topics
  const dynamicSuggestions = language === 'en' ? [
    'Tell me about your cardiology shifts.',
    'How far along is your German recognition process?',
    'Are you willing to relocate to other regions?',
    'What clinical skills did you master at CARE?',
    'How can we schedule a fast video interview?',
    'Do you have your official B2 certificate?'
  ] : [
    'Erzähl mir von deinen Kardiologie-Diensten.',
    'Wie weit ist dein Anerkennungsverfahren?',
    'Bist du bereit, bundesweit umzuziehen?',
    'Welche Fähigkeiten hast du bei CARE gelernt?',
    'Wie können wir ein Video-Interview buchen?',
    'Besitzt du bereits ein offizielles B2 Zertifikat?'
  ];

  const getLocalResponse = (message: string, lang: Language): string => {
    const msg = message.toLowerCase();
    const isDe = lang === 'de' || msg.includes('deutsch') || msg.includes('wie') || msg.includes('was') || msg.includes('bist') || msg.includes('hast') || msg.includes('erzähl') || msg.includes('wer') || msg.includes('sie') || msg.includes('ihr');

    if (
      msg.includes('erfahrung') || msg.includes('arbeit') || msg.includes('notfall') || 
      msg.includes('kardiologie') || msg.includes('intensiv') || msg.includes('care') || 
      msg.includes('hospital') || msg.includes('klinik') || msg.includes('schicht') || 
      msg.includes('dienst') || msg.includes('station') || msg.includes('beruf') || 
      msg.includes('experience') || msg.includes('work') || msg.includes('emergency') || 
      msg.includes('cardiology') || msg.includes('nursing') || msg.includes('shifts') || 
      msg.includes('ecg') || msg.includes('ekg') || msg.includes('resuscitation') || msg.includes('cpr')
    ) {
      return isDe
        ? "Ich habe genau 2 Jahre lang (20.05.2023 - 21.03.2025) als Herzinsuffizienz- und Notfallpfleger bei den CARE Hospitals gearbeitet. Zu meinen Aufgaben gehörten das Monitoring kritischer EKG-Werte, die Verabreichung hochwirksamer Herzmedikamente, Assistenz bei Notfallinterventionen und Reanimationen sowie die digitale Dokumentation."
        : "I worked for exactly 2 full years (May 20, 2023 - March 21, 2025) in the Emergency & Cardiology Unit at CARE Hospitals. My core responsibilities included continuous monitoring of unstable heart failure patients, ECG interpretation, high-alert medication administration, emergency resuscitation (CPR), and precise electronic health charting (EHR).";
    }

    if (
      msg.includes('deutsch') || msg.includes('german') || msg.includes('sprache') || 
      msg.includes('language') || msg.includes('b1') || msg.includes('b2') || 
      msg.includes('zertifikat') || msg.includes('certificate') || msg.includes('sprechen') || msg.includes('speak')
    ) {
      return isDe
        ? "Ich bin offiziell zertifiziert auf dem Niveau Deutsch B2! Ich kann mich fließend im Pflegealltag und in Alltagssituationen verständigen. Um den Einstieg in deutschen Kliniken perfekt zu meistern, vertiefe ich täglich pflegespezifische Fachbegriffe und Dokumentationsstandards."
        : "I am officially certified at the German B2 language level (CEFR), ensuring fluent clinical and daily communication. I am currently learning advanced nursing-specific vocabulary (Fachsprache) and German charting standards to handle clinical documentation error-free from day one.";
    }

    if (
      msg.includes('studium') || msg.includes('ausbildung') || msg.includes('bachelor') || 
      msg.includes('b.sc') || msg.includes('bsc') || msg.includes('college') || 
      msg.includes('waltair') || msg.includes('universität') || msg.includes('education') || 
      msg.includes('degree') || msg.includes('eqf') || msg.includes('eqr') || msg.includes('academic') ||
      msg.includes('qualifikation')
    ) {
      return isDe
        ? "Ich habe ein 5-jähriges wissenschaftliches Bachelorstudium (B.Sc. Nursing) am Care Waltair College of Nursing im April 2023 mit einer Note von 70% abgeschlossen. Meine akademische Ausbildung entspricht dem EQR-Niveau 6 (äquivalent zum deutschen Bachelor) und bürgt für fundiertes klinisches Fachwissen."
        : "I completed a 5-year Bachelor of Science in Nursing (B.Sc. Nursing) from Care Waltair College of Nursing in April 2023, graduating with a 70% score. My degree maps to EQF Level 6 (equivalent to European Bachelor level), providing deep scientific and practical clinical foundations.";
    }

    if (
      msg.includes('anerkennung') || msg.includes('anerkennungsverfahren') || msg.includes('gleichstellung') || 
      msg.includes('visa') || msg.includes('visum') || msg.includes('gleichwertigkeit') || 
      msg.includes('recognition') || msg.includes('equalisation') || msg.includes('process') ||
      msg.includes('dokument') || msg.includes('papieren') || msg.includes('behörde')
    ) {
      return isDe
        ? "Mein Anerkennungsverfahren (Anerkennungsverfahren) zur Anerkennung als Pflegefachmann in Deutschland ist bereits eingeleitet. Meine Ausbildungsinhalte decken die Kernvorgaben des deutschen Pflegeberufegesetzes vollumfänglich ab, was eine rasche Gleichwertigkeitsprüfung verspricht."
        : "My recognition process (Anerkennungsverfahren) for Germany is already initiated. My comprehensive B.Sc. Nursing curriculum and practical clinical hours are highly compatible with the German 'Pflegefachmann' profile, ensuring a smooth and rapid equalisation pathway.";
    }

    if (
      msg.includes('umzug') || msg.includes('wohnen') || msg.includes('ort') || 
      msg.includes('region') || msg.includes('deutschland') || msg.includes('flexibel') || 
      msg.includes('nachtschicht') || msg.includes('wochenende') || msg.includes('bereit') || 
      msg.includes('relocate') || msg.includes('germany') || msg.includes('anywhere') || 
      msg.includes('night') || msg.includes('weekend') || msg.includes('motivated') ||
      msg.includes('stuttgart') || msg.includes('münchen') || msg.includes('berlin') || msg.includes('hamburg') || msg.includes('frankfurt')
    ) {
      return isDe
        ? "Ich bin absolut flexibel und bereit, in jede Stadt oder Region in Deutschland umzuziehen! Ich bin sehr motiviert für flexible Schichtdienste, Nachtschichten und Wochenenddienste. Sobald wir uns einig sind, kann das beschleunigte Fachkräfteverfahren eingeleitet werden."
        : "I am fully prepared and highly enthusiastic about relocating to any city or region across Germany. I am highly motivated to work flexible rotating shifts, night duties, and weekends. The Fast-track visa process allows me to relocate rapidly upon contract agreement.";
    }

    if (
      msg.includes('kontakt') || msg.includes('email') || msg.includes('telefon') || 
      msg.includes('phone') || msg.includes('mail') || msg.includes('whatsapp') || 
      msg.includes('interview') || msg.includes('gespräch') || msg.includes('video') || 
      msg.includes('zoom') || msg.includes('teams') || msg.includes('meet') || 
      msg.includes('contact') || msg.includes('schedule')
    ) {
      return isDe
        ? "Sie können mich sehr gerne direkt per E-Mail unter jaswanth.kasireddi@gmail.com oder telefonisch/WhatsApp unter +91 7995754180 erreichen. Ich stehe jederzeit kurzfristig für ein Video-Interview via Zoom, MS Teams oder Google Meet zur Verfügung!"
        : "You can reach me directly via email at jaswanth.kasireddi@gmail.com or on phone/WhatsApp at +91 7995754180. I am available at short notice for initial virtual interviews via Zoom, MS Teams, or Google Meet.";
    }

    if (
      msg.includes('alter') || msg.includes('geburtstag') || msg.includes('geboren') || 
      msg.includes('indien') || msg.includes('nationalität') || msg.includes('herkunft') || 
      msg.includes('age') || msg.includes('birthday') || msg.includes('personal') || msg.includes('person')
    ) {
      return isDe
        ? "Ich bin 26 Jahre alt (geboren am 9. Januar 2000 in Indien) und brenne darauf, meine Karriere als Pflegefachkraft in Deutschland fortzusetzen. Ich bin indischer Staatsbürger und habe meine Dokumente vollständig vorbereitet."
        : "I am 26 years old (born on January 9, 2000 in India). I am an Indian national and I am highly passionate about bringing my intensive cardiological and clinical care qualifications to the German healthcare system.";
    }

    if (
      msg.includes('hallo') || msg.includes('hi') || msg.includes('guten tag') || 
      msg.includes('hello') || msg.includes('hey') || msg.includes('greetings')
    ) {
      return isDe
        ? "Hallo! Vielen Dank für Ihr Interesse an meinem Profil. Ich bin Jaswanth Kasireddi, eine professionelle Pflegefachkraft (B.Sc. Nursing) mit 2 Jahren kardiologischer Notfallerfahrung und offiziellem Deutsch B2-Zertifikat. Wie kann ich Ihnen helfen?"
        : "Hello! Thank you for your interest in my professional portfolio. I am Jaswanth Kasireddi, a registered nurse (B.Sc. Nursing) with 2 years of emergency cardiology experience and officially certified German B2. How can I help you today?";
    }

    // General elegant fallback
    return isDe
      ? "Als studierter Krankenpfleger (B.Sc. Nursing, EQR-Niveau 6) bringe ich 2 Jahre kardiologische Notfallerfahrung (CARE Hospitals) sowie ein zertifiziertes Deutsch B2-Sprachniveau mit. Ich bin bereit für den Schichtdienst und bundesweit umzugsbereit. Kontaktieren Sie mich gerne unter jaswanth.kasireddi@gmail.com!"
      : "As an academically trained registered nurse (B.Sc. Nursing, EQF Level 6), I offer 2 full years of emergency cardiac care experience (CARE Hospitals) and hold an official German B2 certificate. I am fully flexible to work shifts and relocate anywhere in Germany. Contact me directly at jaswanth.kasireddi@gmail.com!";
  };

  useEffect(() => {
    // Auto Scroll to bottom on message ONLY after user has interacted to prevent initial scroll-on-load
    if (userInteracted && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, loading, userInteracted]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setUserInteracted(true);
    setErrorText(null);
    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const resData = await response.json();
      const assistantMessage: Message = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: resData.text || '',
        timestamp: new Date().toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Chat error, falling back to local client responder:', err);
      // Fallback locally and answer recruiter perfectly without displaying an error!
      const fallbackText = getLocalResponse(text, language);
      const assistantMessage: Message = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-white border-t border-olive-100" id="ai-twin">
      <div className="w-full max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-olive-100 border border-olive-200 text-olive-850 rounded-full text-xs font-mono font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-olive-600 animate-spin" style={{ animationDuration: '6s' }} />
            {language === 'en' ? 'BILINGUAL AI TWIN INTEGRATED' : 'INTEGRIERTER KI-ZWILLING'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-olive-950 font-display tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-olive-600 font-light max-w-xl mx-auto">
            {t.subtitle}
          </p>
          <div className="h-1 w-12 bg-olive-500 mx-auto rounded-full"></div>
        </div>

        {/* Console / Chat Widget Frame */}
        <div className="rounded-3xl bg-white border border-olive-200 shadow-xl shadow-olive-700/5 flex flex-col overflow-hidden max-w-3xl mx-auto h-[550px]">
          {/* Header Panel */}
          <div className="px-6 py-4 bg-olive-50 border-b border-olive-150 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-olive-500 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-olive-800">JASWANTH-BOT-v2.5</span>
            </div>
            <span className="text-[9px] font-mono font-bold tracking-widest text-olive-400 uppercase">
              {language === 'en' ? 'GERMAN MEDICAL CERTIFIED DATA' : 'DEUTSCHE KLINIK-DATEN'}
            </span>
          </div>

          {/* Logs / Chat Feed container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-olive-200 scrollbar-track-transparent bg-alabaster/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Node Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-olive-100 border-olive-200 text-olive-700'
                      : 'bg-olive-600 border-olive-700 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 animate-pulse" />}
                </div>

                {/* Message Speech Frame */}
                <div className="space-y-1">
                  <div
                    className={`px-4.5 py-3 rounded-2xl text-xs sm:text-sm font-light leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-olive-600 text-white rounded-tr-none'
                        : 'bg-white border border-olive-150 text-olive-900 rounded-tl-none font-sans whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="text-[9px] font-mono text-olive-400 font-semibold text-right pr-1">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Is Typing loader */}
            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-olive-100 border border-olive-200 text-olive-750 flex items-center justify-center shrink-0 animate-bounce">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="px-4.5 py-3 rounded-2xl bg-white border border-olive-150 rounded-tl-none flex items-center gap-2">
                    <span className="text-xs text-olive-500 font-mono italic">{t.typing}</span>
                    <span className="flex space-x-1">
                      <span className="h-1.5 w-1.5 bg-olive-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 bg-olive-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 bg-olive-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Error fallback display */}
            {errorText && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 text-center flex items-center gap-2 justify-center">
                <span>{errorText}</span>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Preset Chips Actions */}
          <div className="px-6 py-2.5 bg-olive-50/50 border-t border-olive-150 flex flex-wrap gap-2 shrink-0">
            {dynamicSuggestions.map((sug, sIdx) => (
              <button
                key={sIdx}
                id={`suggest-btn-${sIdx}`}
                disabled={loading}
                onClick={() => handleSendMessage(sug)}
                className="px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide rounded-lg bg-white hover:bg-olive-50 border border-olive-200 disabled:opacity-50 text-olive-700 hover:text-olive-900 cursor-pointer transition-colors shadow-sm/5"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Form input console */}
          <div className="px-6 py-4 bg-olive-50/30 border-t border-olive-150 flex items-center gap-3 shrink-0">
            <input
              id="ai-chat-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
              placeholder={t.placeholder}
              className="flex-1 bg-white text-olive-900 placeholder-olive-400 rounded-xl px-4 py-3 text-xs sm:text-sm border border-olive-200 focus:outline-none focus:border-olive-500 focus:ring-1 focus:ring-olive-500 transition-all font-light"
            />
            <button
              id="ai-send-btn"
              disabled={!inputVal.trim() || loading}
              onClick={() => handleSendMessage(inputVal)}
              className="p-3 bg-olive-650 hover:bg-olive-700 text-white rounded-xl shadow-md disabled:opacity-50 cursor-pointer transition-all shrink-0 flex items-center justify-center border-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
