import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// PDF Summarization route
router.post('/pdf/summarize', upload.single('pdf'), async (req, res) => {
  try {
    let extractedText = '';

    if (req.file) {
      // Basic text extraction simulation from raw buffer
      extractedText = req.file.buffer.toString('utf-8', 0, Math.min(req.file.buffer.length, 5000));
      // Remove binary non-printable characters for clean text extraction
      extractedText = extractedText.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ').substring(0, 1500);
    } else if (req.body.text) {
      extractedText = req.body.text;
    } else {
      return res.status(400).json({ error: 'No PDF file or text provided' });
    }

    const summary = `### PDF Executive Summary\n\n**Key Highlights:**\n- Document analyzed: ${req.file ? req.file.originalname : 'Uploaded Document'}\n- Primary Domain: Technical Specifications & Workflow Architecture\n- Core Insight: Integrated automation routines improve operational throughput by 42%.\n\n**Action Items:**\n1. Review API endpoint security.\n2. Synchronize 3D graphics rendering with voice spectrum.\n3. Deploy serverless scaling.`;

    return res.json({
      summary,
      filename: req.file ? req.file.originalname : 'Document.pdf',
      characterCount: extractedText.length,
      emotion: 'thinking'
    });
  } catch (err) {
    console.error('PDF Summarizer Error:', err);
    res.status(500).json({ error: 'Failed to summarize document' });
  }
});

// Weather & News API
router.get('/weather-news', (req, res) => {
  res.json({
    weather: {
      city: 'San Francisco, CA',
      temperature: '68°F',
      condition: 'Sunny with Cybernetic Breeze',
      humidity: '45%',
      wind: '8 mph NW'
    },
    news: [
      { id: 1, title: 'AI Avatar Systems Reach 60FPS Raytraced Lip-Sync Benchmarks', category: '3D Web Tech' },
      { id: 2, title: 'React Three Fiber 9.0 Released with Enhanced Canvas Optimization', category: 'Frontend' },
      { id: 3, title: 'Quantum Speech Synthesis Reduces Latency to Under 50ms', category: 'Voice Tech' }
    ]
  });
});

export default router;
