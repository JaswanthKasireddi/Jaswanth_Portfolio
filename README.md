# Jaswanth Kasireddi — AI Digital Twin & Professional Portfolio

A professional, bilingual (German & English) web application and interactive **AI Digital Twin** designed for **Jaswanth Kasireddi**, an emergency nurse and clinical practitioner qualified at EQF Level 6 with CEFR B2 German certification.

This project is optimized for medical recruiters, clinic administrators, and migration officers seeking to verify credentials, explore professional timeline paths, and interact with an intelligent, server-side Gemini-powered Digital Twin of Jaswanth.

---

## 🚀 Core Features

- **Interactive AI Digital Twin**: A server-side integrated chat companion powered by the **Gemini API** using the `@google/genai` SDK. It simulates a professional, friendly, and medically competent digital representation of Jaswanth, answering questions about his clinical experiences, availability, qualifications, and migration timeline.
- **Clinical Migration Timeline**: A responsive, detailed, and beautifully styled timeline mapping his transition from a B.Sc. in Nursing, to emergency medicine operations, to achieving language proficiency, and finally his path to German medical integration.
- **Bilingual Localization (DE/EN)**: Native translation architecture allowing users to switch dynamically between English and high-quality professional German with zero lag.
- **EQF Level 6 & German Quality Standards**: Structured presentation of professional certifications, emergency procedures, quality nursing standards, and regulatory credentials.
- **Responsive Aesthetic Design**: A premium interface featuring a soft, medical-themed **Alabaster and Olive color palette**, clean typography pairing (Inter & JetBrains Mono), responsive layouts tailored to different device ratios (Mobile, Tablet, and Desktop), and smooth motion entering transitions.

---

## 🎨 Design Theme & Visual System

- **Primary Colors**: Warm Off-Whites (Alabaster), Medical Sage/Olive Greens (representing growth, healing, and precision), and Charcoal Gray headings.
- **Typography**: 
  - **Headings**: Inter / Sans-Serif tracking-tight for modern professional clarity.
  - **Data/Status Indicators**: JetBrains Mono for authentic digital twin metadata, credentials, and logs.
- **Micro-Animations**: Custom EKG heartbeat pulse effects, staggered entering motions, and fluid state-driven layout transitions using `motion`.

---

## 🛠️ Technology Stack

- **Frontend**: React 18+ (TypeScript), Vite, Tailwind CSS, Motion (Animations)
- **Backend API Proxy**: Node.js, Express, tsx, esbuild
- **AI Integration**: `@google/genai` TypeScript SDK (utilizing `process.env.GEMINI_API_KEY`)
- **Icons**: Lucide React

---

## 📁 Project Structure

```text
├── server.ts               # Full-stack Express server acting as a secure API proxy for Gemini
├── vite.config.ts          # Vite build config
├── package.json            # Scripts, dependencies, and metadata
├── index.html              # HTML Entrypoint
└── src/
    ├── main.tsx            # Main React Entrypoint
    ├── App.tsx             # App layout, navigation, and state
    ├── types.ts            # Global TypeScript interfaces
    ├── data.ts             # Professional experience, timeline, and translation dictionaries
    └── components/
        ├── AIChatBot.tsx   # Interactive chat client window with the Digital Twin
        ├── Hero.tsx        # Responsive hero section with premium profile portrait
        ├── AboutSection.tsx # Personal bio and nursing dedication
        ├── SkillsGrid.tsx  # Dynamic grid of clinical and linguistic competencies
        ├── Timeline.tsx    # Interactive migration timeline
        └── Standards.tsx   # Clinical standards and professional certifications
```

---

## ⚙️ Development and Production Build

### Environment Setup

Create a `.env` file in the root directory (based on `.env.example`):

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
Starts the Express server with Vite middleware in development mode:
```bash
npm run dev
```

### 3. Build for Production
Compiles the React frontend static files to `/dist` and bundles the backend `server.ts` into a fast, standalone production build (`dist/server.cjs`) using `esbuild`:
```bash
npm run build
```

### 4. Start Production Server
```bash
npm run start
```

---

## 🛡️ License and Copyright

This project is licensed under the Apache-2.0 License. All rights reserved.
