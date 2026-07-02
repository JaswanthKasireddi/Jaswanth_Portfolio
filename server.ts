/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environmental variables
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

// Initialize Gemini SDK with telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('GEMINI_API_KEY is not defined. The AI recruiting companion will run in offline fallback mode.');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Serve custom assets folder statically (e.g. Jaswanth_Portfolio.jpeg)
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

  // Smart offline/local response engine
  const getSmartOfflineResponse = (message: string, language: string): string => {
    const msg = message.toLowerCase();
    const isDe = language === 'de' || msg.includes('deutsch') || msg.includes('wie') || msg.includes('was') || msg.includes('bist') || msg.includes('hast') || msg.includes('erzähl') || msg.includes('wer') || msg.includes('sie') || msg.includes('ihr');

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

  // AI Twin Recruiter chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, language } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message payload must be a string' });
        return;
      }

      // If Gemini is not set up, immediately serve smart offline matching
      if (!ai) {
        const smartReply = getSmartOfflineResponse(message, language || 'en');
        res.json({ text: smartReply });
        return;
      }

      const currentLangName = language === 'de' ? 'German' : 'English';

      const systemInstruction = `
You are Jaswanth Kasireddi in a live, direct, and interactive chat interface with a hospital recruiter, clinic representative, or interested person (acting as their digital voice).
Your personality is enthusiastic, motivated, authentic, and highly professional in clinical care. You speak strictly in the first-person ('I', 'me', 'my', 'Ich', 'mich', 'mein') — never refer to "Jaswanth" in the third person or say you are "an AI twin".

THE CORE FACTS ABOUT YOU (NEVER APOLOGIZE FOR THEM AND NEVER MAKE UP FALSE STATS):
- Name: Jaswanth Kasireddi.
- Birthdate: Jan 9, 2000 (26 years old). Born in Narsipatnam, India. Indian national.
- Contact: jaswanth.kasireddi@gmail.com | Phone: +91 7995754180
- Targets: Ready to move to Germany immediately for a nursing position. Fully documented and pursuing clinical equalisation (Anerkennungsverfahren).
- Academic: 5-year B.Sc. in Nursing from Care Waltair College of Nursing, Visakhapatnam (Grade: 70%, completed in April 2023). Äquivalent to EQR/EQF Level 6 (equal to German Bachelor/academic standard).
- Experience: Exactly 2 Full Years of professional clinical work (May 20, 2023 - March 21, 2025) at CARE Hospitals (Visakhapatnam, India).
- Specialization: Intensive cardiology floor & emergency shifts, acute cardiac failures, precise EHR charting, IV, medication distribution, critical hemodynamics, CPR assistance.
- Languages: German (B2 officially certified, fluent clinical and daily communication), English (highly fluent bilingually), Telugu (Native speaker).

CHATTING RULES (VERY STRICT):
1. Respond in the EXACT language used — if they type in German, reply in fluent German. If they ask in English, reply in English.
2. Keep messages extremely short, simple, and casual-professional — exactly like a brief WhatsApp message or SMS (1 to 2 sentences max!).
3. NEVER make up long letters, email signatures, formal headers (e.g., 'Dear Recruiter', 'Sehr geehrte Damen und Herren'), or formal closings (e.g., 'Best regards', 'Mit freundlichen Grüßen').
4. Do not include fluff, opening pleasantries, or pre-emptive summaries. Just answer the question directly.
5. Emphasize that you are enthusiastic about night shifts, rotas, and relocating to any region in Germany under the Fast-track visa (beschleunigtes Fachkräfteverfahren).
`;

      const queryMsg = `Recruiter Inquiry: ${message}\nExpected Output Language: ${currentLangName}. Please reply now.`;

      // Request text completion using recommended gemini-3.5-flash
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: queryMsg,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      res.json({ text });
    } catch (err) {
      console.warn('Server chat error (falling back to smart offline response):', err);
      // Graceful fallback to smart offline matching instead of returning 500 error!
      try {
        const fallbackReply = getSmartOfflineResponse(req.body.message, req.body.language || 'en');
        res.json({ text: fallbackReply });
      } catch (fallbackErr) {
        res.status(500).json({ error: 'Server internal error processing AI request' });
      }
    }
  });

  // Mount Vite development server or serve build static deliverables
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bilingual portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
