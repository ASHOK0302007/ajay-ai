import React from 'react';
import { Bot, Mic, MicOff, Settings, Volume2, Sparkles, Activity } from 'lucide-react';

export default function Header({
  isListening,
  onToggleListening,
  onOpenSettings,
  isSpeaking,
  onStopSpeaking,
  onTriggerWave,
  wakeWordEnabled
}) {
  return (
    <header className="w-full glass-panel px-6 py-4 rounded-2xl flex items-center justify-between shadow-xl mb-6">
      {/* Brand & System Status */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-black font-bold shadow-lg shadow-cyan-500/30">
            <Bot className="w-6 h-6 text-black" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            AJAY AI ASSISTANT
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono tracking-normal">
              v2.4 ONLINE
            </span>
          </h1>
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            3D Neural Engine • Continuous Audio Pipeline
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-3">
        {/* Wake Word Badge */}
        {wakeWordEnabled && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Wake Word: <strong className="text-white font-mono">"Hey Ajay"</strong></span>
          </div>
        )}

        {/* Wave Arm Button */}
        <button
          onClick={onTriggerWave}
          title="Wave Arm Gesture"
          className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all hover:border-cyan-500/50"
        >
          👋 Wave
        </button>

        {/* Interrupt Speaking Button */}
        {isSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 animate-pulse"
          >
            <Volume2 className="w-4 h-4 text-rose-400" />
            Interrupt
          </button>
        )}

        {/* Continuous Voice Microphone Toggle */}
        <button
          onClick={onToggleListening}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
            isListening
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/30 animate-pulse'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-cyan-500/30'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Listen Voice
            </>
          )}
        </button>

        {/* Settings Modal Button */}
        <button
          onClick={onOpenSettings}
          className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all hover:border-cyan-500/50"
          title="Settings & Audio Voices"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
