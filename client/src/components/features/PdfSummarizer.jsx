import React, { useState } from 'react';
import { FileText, Upload, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { summarizePdf } from '../../services/aiEngine';

export default function PdfSummarizer({ onSpeakResponse }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [summaryResult, setSummaryResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSummarize = async () => {
    if (!selectedFile && !pastedText.trim()) return;
    setLoading(true);
    try {
      const res = await summarizePdf(selectedFile, pastedText);
      setSummaryResult(res.summary);
      if (onSpeakResponse) {
        onSpeakResponse("Document processing complete. I have extracted the key action items and executive summary.", 'thinking');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-5 flex flex-col gap-4 shadow-xl border border-cyan-500/20">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <FileText className="w-5 h-5 text-cyan-400" />
        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
          PDF & Document AI Summarizer
        </h2>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-950/40 transition-all relative">
          <input
            type="file"
            accept=".pdf,.txt,.md"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Upload className="w-8 h-8 text-cyan-400 mb-2 animate-bounce" />
          <p className="text-xs font-semibold text-slate-200">
            {selectedFile ? selectedFile.name : 'Drop your PDF file here or click to browse'}
          </p>
          <span className="text-[10px] text-slate-500 mt-1">Supports PDF, TXT, Markdown up to 10MB</span>
        </div>

        {/* Text Area Input Option */}
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder="Or paste long article/document text directly here..."
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 h-[130px] resize-none"
        />
      </div>

      <button
        onClick={handleSummarize}
        disabled={loading || (!selectedFile && !pastedText.trim())}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-40"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-black" />
            Parsing Document & Extracting Insights...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-black" />
            Generate AI Summary & Bullet Points
          </>
        )}
      </button>

      {/* Summary Output */}
      {summaryResult && (
        <div className="flex-1 bg-slate-950/90 border border-cyan-500/30 rounded-xl p-4 overflow-y-auto text-xs text-slate-200 leading-relaxed font-sans shadow-inner">
          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Executive Insights Generated</span>
          </div>
          <div className="whitespace-pre-wrap">{summaryResult}</div>
        </div>
      )}
    </div>
  );
}
