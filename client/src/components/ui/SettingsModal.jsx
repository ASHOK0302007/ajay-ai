import React, { useState, useEffect } from 'react';
import { X, Volume2, Key, Sliders, Sparkles, Check, Zap } from 'lucide-react';
import { voiceEngine } from '../../services/voiceEngine';

export default function SettingsModal({ isOpen, onClose, wakeWordEnabled, setWakeWordEnabled }) {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1.05);
  const [pitch, setPitch] = useState(0.88);
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [gojoApplied, setGojoApplied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVoices(voiceEngine.voices);
      if (voiceEngine.selectedVoice) {
        setSelectedVoice(voiceEngine.selectedVoice.name);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVoiceChange = (e) => {
    const vName = e.target.value;
    setSelectedVoice(vName);
    voiceEngine.setVoice(vName);
  };

  const handleRateChange = (e) => {
    const val = parseFloat(e.target.value);
    setRate(val);
    voiceEngine.setRate(val);
  };

  const handlePitchChange = (e) => {
    const val = parseFloat(e.target.value);
    setPitch(val);
    voiceEngine.setPitch(val);
  };

  const handleApplyGojoPreset = () => {
    voiceEngine.applyGojoVoicePreset();
    setRate(voiceEngine.rate);
    setPitch(voiceEngine.pitch);
    if (voiceEngine.selectedVoice) {
      setSelectedVoice(voiceEngine.selectedVoice.name);
    }
    setGojoApplied(true);
    setTimeout(() => setGojoApplied(false), 2000);
  };

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', geminiKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-slate-100">AJAY Voice & AI Settings</h2>
        </div>

        {/* Gojo Voice Preset Button */}
        <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/40 flex items-center justify-between">
          <div>
            <div className="font-bold text-xs text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Satoru Gojo Voice Profile
            </div>
            <p className="text-[10px] text-slate-400">Deep, smooth, charismatic male tone (Pitch 0.88x)</p>
          </div>
          <button
            onClick={handleApplyGojoPreset}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1"
          >
            {gojoApplied ? <Check className="w-3.5 h-3.5" /> : 'Apply Gojo Voice'}
          </button>
        </div>

        <div className="space-y-5 text-xs text-slate-300">
          {/* Voice Selection */}
          <div>
            <label className="block mb-1.5 font-semibold text-slate-400 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-cyan-400" /> Speech Voice Model
            </label>
            <select
              value={selectedVoice}
              onChange={handleVoiceChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
            >
              {voices.map((v, i) => (
                <option key={i} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Voice Speed Rate */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-400">Voice Speed (Rate)</label>
              <span className="font-mono text-cyan-400">{rate}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={rate}
              onChange={handleRateChange}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Voice Pitch */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-400">Voice Pitch (Gojo Deep Tone)</label>
              <span className="font-mono text-cyan-400">{pitch}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.02"
              value={pitch}
              onChange={handlePitchChange}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Wake Word Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Background Wake Word
              </div>
              <p className="text-[10px] text-slate-500">Listen for "Hey Ajay" / "Gojo" in background</p>
            </div>
            <input
              type="checkbox"
              checked={wakeWordEnabled}
              onChange={(e) => setWakeWordEnabled(e.target.checked)}
              className="w-4 h-4 accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Custom Gemini API Key */}
          <div>
            <label className="block mb-1.5 font-semibold text-slate-400 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-purple-400" /> Google Gemini / OpenAI API Key (Optional)
            </label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="Paste API Key here..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-bold hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-black" /> Saved!
              </>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
