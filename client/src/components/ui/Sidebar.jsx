import React from 'react';
import {
  MessageSquare,
  Code2,
  FileText,
  CheckSquare,
  DollarSign,
  CloudSun,
  Zap
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'chat', label: 'AI Chat & Voice', icon: MessageSquare, badge: 'Live 3D' },
  { id: 'code', label: 'Code Assistant', icon: Code2, badge: 'Dev' },
  { id: 'pdf', label: 'PDF Summarizer', icon: FileText },
  { id: 'planner', label: 'Daily Planner', icon: CheckSquare },
  { id: 'expenses', label: 'Expense Tracker', icon: DollarSign },
  { id: 'weather', label: 'Weather & News', icon: CloudSun }
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-full lg:w-64 glass-panel p-3 sm:p-4 rounded-2xl flex flex-col gap-2 shadow-xl">
      <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400/80 flex items-center gap-1.5 mb-1 sm:mb-2">
        <Zap className="w-3.5 h-3.5" /> Workspace Modules
      </div>

      {/* Responsive Horizontal Scroll on Mobile / Vertical List on Desktop */}
      <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all shrink-0 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              {item.badge && (
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 ml-2">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Metrics (Desktop view) */}
      <div className="hidden lg:block mt-auto pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span>Responsive 3D</span>
            <span className="text-emerald-400 font-mono font-bold">Mobile/Desktop</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[100%]" />
          </div>
          <div className="flex items-center justify-between text-slate-400 pt-1">
            <span>FPS Performance</span>
            <span className="text-cyan-400 font-mono">60 FPS</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
