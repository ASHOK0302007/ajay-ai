# AJAY AI Assistant - Futuristic 3D AI Voice Web Application

AJAY AI Assistant is a production-ready, futuristic 3D web application featuring a realistic interactive cybernetic avatar, continuous voice recognition, real-time lip-sync, multiple emotion states, face/cursor tracking, and an extensive AI toolsuite (Code Assistant, PDF Summarizer, Daily Planner, Expense Tracker, Calendar Assistant, and Telemetry Weather & News).

---

## 🌟 Key Features & Tech Stack

### Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS (Glassmorphism & Cyber Theme), Three.js, `@react-three/fiber`, `@react-three/drei`, Lucide React Icons, Web Speech API.
- **Backend**: Node.js, Express, Multer, Node-Fetch, Dotenv.
- **Integrations**: Google Gemini API, OpenAI GPT API, ElevenLabs TTS Proxy, Web Speech STT/TTS.
- **Database**: SQL Schema (`db/schema.sql`) and Prisma ORM Schema (`db/prisma_schema.prisma`).

### Features Breakdown
1. 🤖 **3D Cyber Avatar**: Real-time 60 FPS rendering, head tracking toward mouse cursor, procedural eyelid blinking, chest breathing animation, hand wave gesture on load/wake-word, and viseme lip-sync mouth scaling.
2. 🎤 **Voice Pipeline**: Continuous STT, background wake-word detection ("Hey Ajay"), custom synthesis voice model selector, pitch/rate controls, audio spectrum canvas visualizer, and instant speech interrupt button.
3. 😊 **Dynamic Emotions**: 7 reactive emotion states (`Happy`, `Thinking`, `Confused`, `Excited`, `Sad`, `Surprised`, `Laughing`) reflected in avatar lighting, chest core color, and eye glow.
4. 🧠 **AI Feature Suite**:
   - **General Chat**: Markdown responses with interactive code blocks and copy buttons.
   - **Code Assistant**: AI code generator and syntax highlighter across JS, Python, TS, SQL, HTML.
   - **PDF Summarizer**: Drag-and-drop file uploader & executive insights extractor.
   - **Daily Planner**: Task manager with high/medium/low priority tags.
   - **Expense Tracker**: Financial cost logging with category metrics.
   - **Calendar & Weather**: Event planner with live atmospheric weather telemetry.

---

## 📂 Project Folder Structure

```
c:/ajay/ai/
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── 3d/
│       │   │   ├── AvatarCanvas.jsx
│       │   │   ├── CyberAvatar.jsx
│       │   │   ├── HologramRings.jsx
│       │   │   └── ParticleField.jsx
│       │   ├── ui/
│       │   │   ├── DashboardLayout.jsx
│       │   │   ├── Header.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── ChatContainer.jsx
│       │   │   ├── MessageItem.jsx
│       │   │   ├── VoiceVisualizer.jsx
│       │   │   ├── EmotionIndicator.jsx
│       │   │   └── SettingsModal.jsx
│       │   └── features/
│       │       ├── CodeAssistant.jsx
│       │       ├── PdfSummarizer.jsx
│       │       ├── DailyPlanner.jsx
│       │       ├── ExpenseTracker.jsx
│       │       ├── CalendarAssistant.jsx
│       │       └── WeatherNewsWidget.jsx
│       ├── services/
│       │   ├── voiceEngine.js
│       │   ├── aiEngine.js
│       │   └── audioAnalyser.js
│       └── hooks/
│           ├── useVoice.js
│           ├── useAvatarState.js
│           └── useChat.js
└── server/
    ├── package.json
    ├── server.js
    ├── routes/
    │   ├── aiRoutes.js
    │   ├── ttsRoutes.js
    │   └── toolsRoutes.js
    └── db/
        ├── schema.sql
        └── prisma_schema.prisma
```

---

## 🚀 Quick Start & Installation

### 1. Install & Start Backend Server
```bash
cd server
npm install
npm run dev
# Server will run on http://localhost:5000
```

### 2. Install & Start React Client
```bash
cd client
npm install
npm run dev
# Frontend will run on http://localhost:3000
```

---

## ⚙️ Environment Variables (.env)

Create a `.env` file in the `server/` directory:

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

---

## 📊 Database Setup Guide

For SQLite / PostgreSQL database initialization:

```bash
# SQLite / Postgres raw SQL initialization
sqlite3 ajay.db < server/db/schema.sql

# Or using Prisma ORM
cd server
npx prisma db push
```

---

## 🚢 Deployment Guide

1. **Frontend Production Build**:
   ```bash
   cd client
   npm run build
   ```
   The static assets will be emitted into `client/dist`, ready to host on Vercel, Netlify, or AWS S3/CloudFront.

2. **Backend Production Deployment**:
   Deploy the Node Express server to Render, Railway, AWS EC2, or Docker containers.
