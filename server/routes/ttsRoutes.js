import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// ElevenLabs / Azure TTS Proxy Endpoint
router.post('/synthesize', async (req, res) => {
  try {
    const { text, voiceId = '21m00Tcm4TlvDq8ikWAM', speed = 1.0, pitch = 1.0 } = req.body;
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;

    if (!text) {
      return res.status(400).json({ error: 'Text prompt is required.' });
    }

    if (elevenLabsApiKey) {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        res.set('Content-Type', 'audio/mpeg');
        return res.send(Buffer.from(audioBuffer));
      }
    }

    // Return fallback JSON indicator if ElevenLabs is unconfigured
    return res.json({
      fallback: true,
      message: 'Using Web Speech API client synthesis',
      text,
      speed,
      pitch
    });

  } catch (error) {
    console.error('TTS Proxy Error:', error);
    res.status(500).json({ error: 'TTS synthesis error', fallback: true });
  }
});

export default router;
