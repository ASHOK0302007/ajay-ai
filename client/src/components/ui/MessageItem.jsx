import React, { useState } from 'react';
import { Bot, User, Copy, Check, Volume2 } from 'lucide-react';

export default function MessageItem({ message, onSpeak }) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.sender === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic regex formatter for code blocks in text
  const renderFormattedText = (text) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const lang = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
        const codeContent = lang ? lines.slice(1).join('\n') : lines.join('\n');

        return (
          <div key={index} className="my-3 rounded-xl overflow-hidden border border-cyan-500/30 bg-[#070b14]">
            <div className="bg-slate-900/90 px-4 py-1.5 flex items-center justify-between border-b border-slate-800 text-[11px] font-mono text-cyan-300">
              <span>{lang || 'code'}</span>
              <button
                onClick={() => navigator.clipboard.writeText(codeContent)}
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex gap-3 my-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-black shrink-0 mt-1 shadow-md shadow-cyan-500/20">
          <Bot className="w-4 h-4 text-black" />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl p-4 shadow-lg text-sm relative group ${
          isAssistant
            ? 'glass-panel text-slate-100 border-cyan-500/20'
            : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-blue-500/20'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-slate-700/40 pb-1 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">
            {isAssistant ? 'AJAY AI' : 'User'}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] opacity-75">{message.timestamp}</span>
            {isAssistant && onSpeak && (
              <button
                onClick={() => onSpeak(message.text, message.emotion)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400"
                title="Speak Response"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400"
              title="Copy Message"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="leading-relaxed whitespace-pre-wrap font-sans">
          {renderFormattedText(message.text)}
        </div>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
