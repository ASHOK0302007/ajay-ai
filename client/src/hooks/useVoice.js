import { useState, useEffect, useCallback } from 'react';
import { voiceEngine } from '../services/voiceEngine';
import { audioAnalyser } from '../services/audioAnalyser';

export function useVoice({ onFinalTranscript, onWakeWordDetected, setEmotion, setIsSpeaking, setLipViseme }) {
  const [isListening, setIsListening] = useState(false);
  const [wakeWordEnabled, setWakeWordEnabled] = useState(true);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Continuous spectrum monitoring loop for lip sync when speaking
    let animFrameId;
    const updateLipSync = () => {
      if (voiceEngine.isSpeaking) {
        audioAnalyser.init();
        const amplitude = audioAnalyser.getFrequencyData();
        // Scale amplitude (0 - 255) to viseme mouth openness (0.1 - 1.0)
        const viseme = Math.min(1, Math.max(0.1, (amplitude / 80) + Math.random() * 0.3));
        setLipViseme(viseme);
      } else {
        setLipViseme(0);
      }
      animFrameId = requestAnimationFrame(updateLipSync);
    };
    animFrameId = requestAnimationFrame(updateLipSync);
    return () => cancelAnimationFrame(animFrameId);
  }, [setLipViseme]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      voiceEngine.stopListening();
      setIsListening(false);
    } else {
      audioAnalyser.init();
      const success = voiceEngine.startListening(
        (text) => {
          setTranscript(text);
          if (onFinalTranscript) onFinalTranscript(text);
        },
        (wakeText) => {
          if (onWakeWordDetected) onWakeWordDetected(wakeText);
        }
      );
      if (success) setIsListening(true);
    }
  }, [isListening, onFinalTranscript, onWakeWordDetected]);

  const speakText = useCallback((text, emotion = 'happy') => {
    audioAnalyser.init();
    setEmotion(emotion);
    voiceEngine.speak(
      text,
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        setLipViseme(0);
      }
    );
  }, [setEmotion, setIsSpeaking, setLipViseme]);

  const stopSpeaking = useCallback(() => {
    voiceEngine.stopSpeaking();
    setIsSpeaking(false);
    setLipViseme(0);
  }, [setIsSpeaking, setLipViseme]);

  return {
    isListening,
    toggleListening,
    transcript,
    speakText,
    stopSpeaking,
    wakeWordEnabled,
    setWakeWordEnabled
  };
}
