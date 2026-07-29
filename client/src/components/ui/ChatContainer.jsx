import React, { useState, useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import { Send, Mic, MicOff, Paperclip, Sparkles, Trash2, Loader2 } from 'lucide-react';

const SUGGESTIONS = [
  "Explain React Three Fiber in simple terms",
  "Write an async Express endpoint with rate limiting",
  "Summarize daily task schedule",
  "What is the weather forecast today?"
];

export default function ChatContainer({
  messages = [],
  onSendMessage,
  isProcessing = false,
  isListening = false,
  onToggleListening,
  onSpeakMessage,
  onClearHistory
}) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isProcessing) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col glass-panel rounded-2xl p-4 shadow-xl border border-cyan-500/20 overflow-hidden relative">
      {/* Top Bar Actions */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Interactive AI Conversation
          </h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
          title="Clear Chat History"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} onSpeak={onSpeakMessage} />
        ))}

        {isProcessing && (
          <div className="flex items-center gap-3 my-2 text-xs text-cyan-400 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AJAY AI is computing neural response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestion Chips */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {SUGGESTIONS.map((sug, i) => (
          <button
            key={i}
            onClick={() => onSendMessage(sug)}
            className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-400 hover:text-cyan-300 whitespace-nowrap transition-all"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="pt-2 flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening... Speak now or type..." : "Ask AJAY anything..."}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all pr-10 font-sans"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            title="Attach file or code snippet"
          >
            <Paperclip className="w-4 h-4" />
          </button>
        </div>

        {/* Mic Toggle Button */}
        <button
          type="button"
          onClick={onToggleListening}
          className={`p-3 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40'
          }`}
          title="Toggle Continuous Voice Input"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isProcessing}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
