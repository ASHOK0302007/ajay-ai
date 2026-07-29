import React, { useEffect, useRef } from 'react';
import { audioAnalyser } from '../../services/audioAnalyser';

export default function VoiceVisualizer({ isActive = false, isSpeaking = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spectrum = audioAnalyser.getSpectrumArray();
      const barWidth = (canvas.width / 16) - 2;

      for (let i = 0; i < 16; i++) {
        let val = spectrum[i] || 0;
        if (!isActive && !isSpeaking) {
          // Subtle resting ambient pulse
          val = 15 + Math.sin(Date.now() * 0.005 + i) * 10;
        }

        const barHeight = Math.max(4, (val / 255) * canvas.height);
        const x = i * (barWidth + 2);
        const y = canvas.height - barHeight;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        if (isSpeaking) {
          gradient.addColorStop(0, '#3b82f6');
          gradient.addColorStop(1, '#a855f7');
        } else if (isActive) {
          gradient.addColorStop(0, '#ec4899');
          gradient.addColorStop(1, '#f43f5e');
        } else {
          gradient.addColorStop(0, '#00f3ff');
          gradient.addColorStop(1, '#0284c7');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isActive, isSpeaking]);

  return (
    <div className="w-full bg-slate-950/60 p-2.5 rounded-xl border border-cyan-500/20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isActive || isSpeaking ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
        <span className="text-[11px] font-mono text-slate-300">
          {isSpeaking ? 'AI Voice Output Spectrum' : isActive ? 'Microphone Active' : 'Audio Spectrum Ready'}
        </span>
      </div>
      <canvas ref={canvasRef} width={120} height={24} className="rounded-md" />
    </div>
  );
}
