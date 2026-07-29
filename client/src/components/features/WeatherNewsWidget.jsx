import React, { useEffect, useState } from 'react';
import { CloudSun, Newspaper, Wind, Droplets, ExternalLink } from 'lucide-react';
import { fetchWeatherAndNews } from '../../services/aiEngine';

export default function WeatherNewsWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWeatherAndNews().then(setData);
  }, []);

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-5 flex flex-col gap-4 shadow-xl border border-cyan-500/20">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <CloudSun className="w-5 h-5 text-amber-400" />
        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
          Telemetry Weather & Tech Headlines
        </h2>
      </div>

      {/* Weather Forecast Card */}
      {data?.weather && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">{data.weather.city}</span>
            <div className="text-2xl font-bold font-orbitron text-slate-100 mt-0.5">{data.weather.temperature}</div>
            <p className="text-xs text-slate-400">{data.weather.condition}</p>
          </div>

          <div className="space-y-1 text-[11px] text-slate-400 font-mono text-right">
            <div className="flex items-center justify-end gap-1">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Humidity: {data.weather.humidity}
            </div>
            <div className="flex items-center justify-end gap-1">
              <Wind className="w-3.5 h-3.5 text-slate-400" /> Wind: 8 mph
            </div>
          </div>
        </div>
      )}

      {/* News Feed */}
      <div className="flex-1 overflow-y-auto space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
          <Newspaper className="w-4 h-4 text-cyan-400" /> Tech & AI Headlines
        </div>

        {data?.news?.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all flex items-center justify-between text-xs cursor-pointer"
          >
            <div>
              <p className="font-semibold text-slate-200">{item.title}</p>
              <span className="text-[10px] text-cyan-400 font-mono">{item.category}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 hover:text-cyan-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
