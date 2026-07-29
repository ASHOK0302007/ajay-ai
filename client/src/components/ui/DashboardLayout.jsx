import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import EmotionIndicator from './EmotionIndicator';
import VoiceVisualizer from './VoiceVisualizer';
import ChatContainer from './ChatContainer';
import SettingsModal from './SettingsModal';

import AvatarCanvas from '../3d/AvatarCanvas';
import CodeAssistant from '../features/CodeAssistant';
import PdfSummarizer from '../features/PdfSummarizer';
import DailyPlanner from '../features/DailyPlanner';
import ExpenseTracker from '../features/ExpenseTracker';
import CalendarAssistant from '../features/CalendarAssistant';
import WeatherNewsWidget from '../features/WeatherNewsWidget';

import { useAvatarState } from '../../hooks/useAvatarState';
import { useVoice } from '../../hooks/useVoice';
import { useChat } from '../../hooks/useChat';

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 1. Avatar State (Emotion, lipViseme, waving, cursor tracking)
  const {
    emotion,
    setEmotion,
    isSpeaking,
    setIsSpeaking,
    isWaving,
    triggerWave,
    lipViseme,
    setLipViseme,
    mousePos
  } = useAvatarState();

  // 2. Chat History & Neural API hook
  const { messages, sendMessage, isProcessing, clearHistory } = useChat((aiReplyText, aiEmotion) => {
    // Speak AI response automatically and set emotion
    speakText(aiReplyText, aiEmotion);
  });

  // 3. Voice Recognition & Audio Synthesis hook
  const {
    isListening,
    toggleListening,
    speakText,
    stopSpeaking,
    wakeWordEnabled,
    setWakeWordEnabled
  } = useVoice({
    onFinalTranscript: (text) => {
      sendMessage(text);
    },
    onWakeWordDetected: () => {
      triggerWave();
      speakText("Yes! I am listening.", 'excited');
    },
    setEmotion,
    setIsSpeaking,
    setLipViseme
  });

  return (
    <div className="min-h-screen w-full bg-[#07090e] p-4 sm:p-6 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Neon Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Top Header */}
      <Header
        isListening={isListening}
        onToggleListening={toggleListening}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isSpeaking={isSpeaking}
        onStopSpeaking={stopSpeaking}
        onTriggerWave={triggerWave}
        wakeWordEnabled={wakeWordEnabled}
      />

      {/* Grid Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-2">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Center Main Module Display */}
        <div className="lg:col-span-5 flex flex-col h-[650px] lg:h-auto">
          {activeTab === 'chat' && (
            <ChatContainer
              messages={messages}
              onSendMessage={sendMessage}
              isProcessing={isProcessing}
              isListening={isListening}
              onToggleListening={toggleListening}
              onSpeakMessage={(text, emo) => speakText(text, emo)}
              onClearHistory={clearHistory}
            />
          )}

          {activeTab === 'code' && (
            <CodeAssistant onSpeakResponse={(text, emo) => speakText(text, emo)} />
          )}

          {activeTab === 'pdf' && (
            <PdfSummarizer onSpeakResponse={(text, emo) => speakText(text, emo)} />
          )}

          {activeTab === 'planner' && <DailyPlanner />}

          {activeTab === 'expenses' && <ExpenseTracker />}

          {activeTab === 'weather' && (
            <div className="flex flex-col gap-4 h-full">
              <WeatherNewsWidget />
              <CalendarAssistant />
            </div>
          )}
        </div>

        {/* Right 3D Interactive Avatar Stage */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-4 flex flex-col justify-between relative shadow-2xl border border-cyan-500/20 h-[500px] lg:h-auto">
          {/* Top Emotion State & Visualizer */}
          <div className="space-y-3 z-10">
            <EmotionIndicator emotion={emotion} onSelectEmotion={setEmotion} />
            <VoiceVisualizer isActive={isListening} isSpeaking={isSpeaking} />
          </div>

          {/* 3D Three.js Interactive Avatar Stage */}
          <div className="flex-1 w-full my-2 relative">
            <AvatarCanvas
              emotion={emotion}
              isSpeaking={isSpeaking}
              isWaving={isWaving}
              lipViseme={lipViseme}
              mousePos={mousePos}
            />
          </div>

          {/* Bottom Interactive Avatar Controls Bar */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Tracking Cursor Target</span>
            </div>
            <span className="font-mono text-cyan-300">X: {mousePos.x.toFixed(2)} | Y: {mousePos.y.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Settings */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        wakeWordEnabled={wakeWordEnabled}
        setWakeWordEnabled={setWakeWordEnabled}
      />
    </div>
  );
}
