import React, { useState } from 'react';
import { BudgetGoal, BudgetGoalMode } from '../types';

interface GoalSettingsModalProps {
  currentGoal: BudgetGoal;
  onClose: () => void;
  onSave: (updatedGoal: BudgetGoal) => void;
}

export const GoalSettingsModal: React.FC<GoalSettingsModalProps> = ({
  currentGoal,
  onClose,
  onSave,
}) => {
  const [mode, setMode] = useState<BudgetGoalMode>(currentGoal.mode);
  const [amount, setAmount] = useState<string>(currentGoal.targetAmount.toString());
  const [error, setError] = useState<string>('');

  const quickAmounts = mode === 'spending_limit'
    ? [50000, 100000, 200000, 500000]
    : [100000, 250000, 500000, 1000000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!amount || isNaN(num) || num <= 0) {
      setError('Please enter a valid target amount greater than 0');
      return;
    }

    onSave({
      mode,
      targetAmount: num,
      period: 'monthly',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-modal p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-white/15 fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <i className={`fa-solid ${mode === 'spending_limit' ? 'fa-chart-pie text-amber-400' : 'fa-piggy-bank text-emerald-400'}`}></i>
            <span>Set Monthly Target</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-1 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {error && (
          <div className="mb-3 p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Target Mode Segmented Switch */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">
              Goal Tracking Type
            </label>
            <div className="grid grid-cols-2 p-1 bg-white/5 rounded-xl border border-white/10 gap-1">
              <button
                type="button"
                onClick={() => {
                  setMode('spending_limit');
                  setError('');
                }}
                className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'spending_limit'
                    ? 'bg-yellow-400 text-black font-bold shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-gauge-high text-[11px]"></i>
                <span>Spending Limit</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('savings_goal');
                  setError('');
                }}
                className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'savings_goal'
                    ? 'bg-emerald-400 text-black font-bold shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-piggy-bank text-[11px]"></i>
                <span>Savings Goal</span>
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5 px-0.5">
              {mode === 'spending_limit'
                ? 'Monitors cumulative debits and bills paid in the calendar month.'
                : 'Tracks your current available balance toward your target milestone.'}
            </p>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Monthly Target Amount (₦)
            </label>
            <input
              type="number"
              placeholder="e.g. 100000"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              className="w-full p-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-yellow-400 font-mono"
            />
          </div>

          {/* Quick preset amount chips */}
          <div>
            <div className="text-[11px] text-gray-400 mb-1.5">Quick Presets:</div>
            <div className="flex gap-1.5 flex-wrap">
              {quickAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className="px-2.5 py-1 text-xs rounded-lg glass hover:bg-yellow-400/20 text-gray-300 hover:text-yellow-400 border border-white/10 cursor-pointer transition font-mono"
                >
                  ₦{preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer shadow-md hover:shadow-yellow-400/25"
            >
              Save Target
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 text-gray-400 hover:text-gray-200 font-medium transition w-full text-center text-xs py-1.5 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
