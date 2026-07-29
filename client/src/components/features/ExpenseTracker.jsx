import React, { useState } from 'react';
import { DollarSign, Plus, PieChart, TrendingUp, CreditCard } from 'lucide-react';

const INITIAL_EXPENSES = [
  { id: '1', title: 'OpenAI GPT-4 API Usage', amount: 42.50, category: 'AI API', date: '2026-07-28' },
  { id: '2', title: 'Vite & AWS Cloud Hosting', amount: 28.00, category: 'Cloud', date: '2026-07-27' },
  { id: '3', title: 'ElevenLabs Speech Synthesis', amount: 15.00, category: 'Voice', date: '2026-07-25' }
];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('AI API');

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;
    const newExp = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses([newExp, ...expenses]);
    setTitle('');
    setAmount('');
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-5 flex flex-col gap-4 shadow-xl border border-cyan-500/20">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            AI Expense & Budget Tracker
          </h2>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block uppercase">Total Spent</span>
          <span className="text-sm font-mono font-bold text-emerald-400">${totalSpent.toFixed(2)}</span>
        </div>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Expense title..."
          className="sm:col-span-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
        />
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount ($)"
          className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1 shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" /> Add Log
        </button>
      </form>

      {/* Expenses History Table */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">{exp.title}</p>
                <span className="text-[10px] text-slate-500 font-mono">{exp.date}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono font-bold text-slate-100">${exp.amount.toFixed(2)}</span>
              <span className="block text-[10px] text-cyan-400 uppercase tracking-wider">{exp.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
