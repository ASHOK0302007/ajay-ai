import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import aiRoutes from './routes/aiRoutes.js';
import ttsRoutes from './routes/ttsRoutes.js';
import toolsRoutes from './routes/toolsRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// API Routes
app.use('/api/ai', aiRoutes);
app.use('/api/tts', ttsRoutes);
app.use('/api/tools', toolsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'AJAY AI Assistant Server',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🤖 AJAY AI Assistant Backend API Server`);
  console.log(`🚀 Running live at http://localhost:${PORT}`);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = PORT + 1;
    console.log(`Port ${PORT} in use, starting server on port ${fallbackPort}...`);
    app.listen(fallbackPort, () => {
      console.log(`🚀 Server fallback live at http://localhost:${fallbackPort}`);
    });
  } else {
    console.error('Server error:', err);
  }
});

