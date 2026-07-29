import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from 'lucide-react';

const INITIAL_EVENTS = [
  { id: '1', title: '3D Neural Mesh Demo Sync', time: '02:00 PM - 03:00 PM', location: 'Virtual VR Room', date: 'Today' },
  { id: '2', title: 'React Three Fiber Performance Audit', time: '04:30 PM - 05:30 PM', location: 'Dev Studio', date: 'Today' },
  { id: '3', title: 'ElevenLabs Voice Model Tuning', time: '11:00 AM - 12:00 PM', location: 'Audio Lab', date: 'Tomorrow' }
];

export default function CalendarAssistant() {
  const [events] = useState(INITIAL_EVENTS);

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-5 flex flex-col gap-4 shadow-xl border border-cyan-500/20">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-purple-400" />
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Calendar & Schedule Assistant
          </h2>
        </div>
        <span className="text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 font-mono">
          3 Events Upcoming
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-100">{evt.title}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                {evt.date}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{evt.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{evt.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
