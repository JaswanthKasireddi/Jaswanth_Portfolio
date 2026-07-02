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
      console.error('Chat error:', err);
      setErrorText(t.error);
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
