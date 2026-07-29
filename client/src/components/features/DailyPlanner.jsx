import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, CheckCircle2, Circle, Clock, Flame } from 'lucide-react';

const INITIAL_TASKS = [
  { id: '1', title: 'Review 3D CyberAvatar lip-sync audio spectrum', priority: 'high', completed: true },
  { id: '2', title: 'Deploy Express AI proxy backend endpoints', priority: 'high', completed: false },
  { id: '3', title: 'Test Web Speech API wake-word "Hey Ajay"', priority: 'medium', completed: false },
  { id: '4', title: 'Optimize React Three Fiber frame rates (60FPS)', priority: 'low', completed: true }
];

export default function DailyPlanner() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const item = {
      id: Date.now().toString(),
      title: newTaskTitle,
      priority,
      completed: false
    };
    setTasks([item, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-5 flex flex-col gap-4 shadow-xl border border-cyan-500/20">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Daily Planner & Reminders
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
          {completedCount} / {tasks.length} Done
        </span>
      </div>

      {/* Task Add Input */}
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task or daily goal..."
          className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
        >
          <option value="high">High 🔥</option>
          <option value="medium">Med ⚡</option>
          <option value="low">Low ☕</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              task.completed
                ? 'bg-slate-950/40 border-slate-800/80 opacity-60 line-through text-slate-400'
                : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-cyan-500/30'
            }`}
          >
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTask(task.id)}>
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span className="text-xs font-medium">{task.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                task.priority === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                task.priority === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-slate-800 text-slate-400'
              }`}>
                {task.priority.toUpperCase()}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
