import React from 'react';
import { Smile, Brain, HelpCircle, Flame, Frown, AlertCircle, Laugh } from 'lucide-react';

const EMOTION_CONFIG = {
  happy: { label: 'Happy', icon: Smile, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
  thinking: { label: 'Thinking...', icon: Brain, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
  confused: { label: 'Confused', icon: HelpCircle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  excited: { label: 'Excited!', icon: Flame, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/30' },
  sad: { label: 'Sad', icon: Frown, color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/30' },
  surprised: { label: 'Surprised', icon: AlertCircle, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
  laughing: { label: 'Laughing', icon: Laugh, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' }
};

export default function EmotionIndicator({ emotion = 'happy', onSelectEmotion }) {
  const current = EMOTION_CONFIG[emotion] || EMOTION_CONFIG.happy;
  const Icon = current.icon;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AI Emotion State</span>
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${current.bg} ${current.color}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{current.label}</span>
        </div>
      </div>

      {/* Interactive Emotion Selector Chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {Object.keys(EMOTION_CONFIG).map((key) => {
          const cfg = EMOTION_CONFIG[key];
          const ElemIcon = cfg.icon;
          const isSelected = emotion === key;
          return (
            <button
              key={key}
              onClick={() => onSelectEmotion && onSelectEmotion(key)}
              title={`Switch to ${cfg.label}`}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                isSelected
                  ? `${cfg.bg} ${cfg.color} scale-105 shadow-md`
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              <ElemIcon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
