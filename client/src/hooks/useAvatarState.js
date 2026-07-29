import { useState, useCallback, useEffect } from 'react';

export function useAvatarState() {
  const [emotion, setEmotion] = useState('happy'); // happy, thinking, confused, excited, sad, surprised, laughing
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isWaving, setIsWaving] = useState(true); // Wave on load
  const [lipViseme, setLipViseme] = useState(0); // 0 to 1 open amount
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Auto end wave after 3 seconds
  useEffect(() => {
    if (isWaving) {
      const timer = setTimeout(() => setIsWaving(false), 3200);
      return () => clearTimeout(timer);
    }
  }, [isWaving]);

  // Track mouse coordinates for avatar eye/head direction
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerWave = useCallback(() => {
    setIsWaving(true);
  }, []);

  return {
    emotion,
    setEmotion,
    isSpeaking,
    setIsSpeaking,
    isWaving,
    triggerWave,
    lipViseme,
    setLipViseme,
    mousePos
  };
}
