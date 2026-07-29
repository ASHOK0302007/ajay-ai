import React, { useState } from 'react';
import { Code2, Play, Copy, Check, Sparkles, Terminal } from 'lucide-react';
import { sendChatMessage } from '../../services/aiEngine';

export default function CodeAssistant({ onSpeakResponse }) {
  const [prompt, setPrompt] = useState('');
  const [codeOutput, setCodeOutput] = useState(`// Welcome to AJAY Code Assistant
// Select a language and type your request above.

async function initializeNeuralMesh() {
  console.log("Connecting 3D Three.js scene to voice spectrum...");
  return { status: "ONLINE", latency: "12ms" };
}`);
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      const res = await sendChatMessage(`Write ${language} code for: ${prompt}`, [], 'coding');
      setCodeOutput(res.reply);
      if (onSpeakResponse) {
        onSpeakResponse("I have generated your code snippet. You can review it in the code editor preview.", 'thinking');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-5 flex flex-col gap-4 shadow-xl border border-cyan-500/20">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            AI Code Generator & Debugger
          </h2>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500/50"
        >
          <option value="javascript">JavaScript / React</option>
          <option value="python">Python</option>
          <option value="typescript">TypeScript</option>
          <option value="sql">SQL Query</option>
          <option value="html">HTML / CSS</option>
        </select>
      </div>

      {/* Input Prompt */}
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Create a React custom hook for WebSocket connection..."
          className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans"
        />
        <button
          onClick={handleGenerateCode}
          disabled={loading || !prompt.trim()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
      </div>

      {/* Editor Output Preview */}
      <div className="flex-1 rounded-xl bg-[#060911] border border-cyan-500/30 overflow-hidden flex flex-col min-h-[300px]">
        <div className="bg-slate-900/80 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Output Editor ({language})</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-white flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <pre className="p-4 flex-1 text-xs font-mono text-cyan-200 overflow-auto leading-relaxed selection:bg-cyan-500 selection:text-black">
          <code>{codeOutput}</code>
        </pre>
      </div>
    </div>
  );
}
