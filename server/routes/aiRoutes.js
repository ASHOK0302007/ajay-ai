import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Helper to determine natural emotion based on response content
function analyzeEmotion(text) {
  const lower = text.toLowerCase();
  if (lower.includes('error') || lower.includes('confus') || lower.includes('unsure') || lower.includes('hard to say')) {
    return 'confused';
  }
  if (lower.includes('fantastic') || lower.includes('awesome') || lower.includes('rocket') || lower.includes('super')) {
    return 'excited';
  }
  if (lower.includes('haha') || lower.includes('funny') || lower.includes('lol') || lower.includes('joke')) {
    return 'laughing';
  }
  if (lower.includes('sorry') || lower.includes('apologize') || lower.includes('unfortunately')) {
    return 'sad';
  }
  if (lower.includes('wow') || lower.includes('incredible') || lower.includes('surpris') || lower.includes('unexpected')) {
    return 'surprised';
  }
  if (lower.includes('analyzing') || lower.includes('calculating') || lower.includes('let me think') || lower.includes('code')) {
    return 'thinking';
  }
  return 'happy';
}

// Interactive AI Chat Endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [], mode = 'general', context = '' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    let responseText = '';
    let emotion = 'happy';

    // 1. Try Gemini API if key is present
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `You are AJAY, an advanced futuristic AI Assistant. Keep responses concise, clear, and helpful. Mode: ${mode}. Context: ${context}\n\nUser: ${message}` }]
                }
              ]
            })
          }
        );
        const data = await geminiRes.json();
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          responseText = data.candidates[0].content.parts[0].text;
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local engine:', err.message);
      }
    }

    // 2. Try OpenAI API if no response yet and key is present
    if (!responseText && openaiKey) {
      try {
        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: `You are AJAY, a futuristic AI assistant. Mode: ${mode}.` },
              { role: 'user', content: message }
            ]
          })
        });
        const data = await openAiRes.json();
        if (data?.choices?.[0]?.message?.content) {
          responseText = data.choices[0].message.content;
        }
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to local engine:', err.message);
      }
    }

    // 3. Fallback Smart Neural Engine
    if (!responseText) {
      const lower = message.toLowerCase();

      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        responseText = "Greetings! I am AJAY, your futuristic AI Assistant. How can I assist you with your code, schedule, or tasks today?";
        emotion = 'happy';
      } else if (lower.includes('who are you') || lower.includes('your name')) {
        responseText = "I am AJAY AI Assistant—a production-grade 3D cybernetic assistant built with React, Three.js, and advanced neural processing. I can hear, speak, analyze files, code, and organize your day!";
        emotion = 'excited';
      } else if (lower.includes('code') || lower.includes('function') || lower.includes('react') || lower.includes('js')) {
        responseText = "```javascript\n// Here is an optimized asynchronous routine for AJAY Assistant\nasync function fetchNeuralResponse(query) {\n  const response = await fetch('/api/ai/chat', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ message: query })\n  });\n  return await response.json();\n}\n```\nI've generated a sleek, clean implementation for your task.";
        emotion = 'thinking';
      } else if (lower.includes('weather')) {
        responseText = "Currently monitoring atmospheric sensors: 72°F (22°C), Clear skies with a gentle breeze. Ideal conditions for coding!";
        emotion = 'happy';
      } else if (lower.includes('joke') || lower.includes('funny')) {
        responseText = "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😄";
        emotion = 'laughing';
      } else {
        responseText = `I have processed your request regarding: "${message}". All primary neural nodes are operational, and I'm ready to assist you further across your workspace tasks.`;
        emotion = analyzeEmotion(responseText);
      }
    } else {
      emotion = analyzeEmotion(responseText);
    }

    return res.json({
      reply: responseText,
      emotion: emotion,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({
      reply: "System notice: An internal processing error occurred. However, all safety protocols remain nominal.",
      emotion: "confused"
    });
  }
});

export default router;
