import React from 'react';
import { BudgetGoal } from '../types';

interface WalletCardProps {
  balance: number;
  visible: boolean;
  onToggleVisible: () => void;
  onOpenFund: () => void;
  onOpenTransfer: () => void;
  budgetGoal: BudgetGoal;
  monthlySpent: number;
  onOpenGoalSettings: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  visible,
  onToggleVisible,
  onOpenFund,
  onOpenTransfer,
  budgetGoal,
  monthlySpent,
  onOpenGoalSettings,
}) => {
  const isSpending = budgetGoal.mode === 'spending_limit';
  const currentVal = isSpending ? monthlySpent : balance;
  const targetVal = budgetGoal.targetAmount;
  const rawPercentage = targetVal > 0 ? (currentVal / targetVal) * 100 : 0;
  const clampedPercentage = Math.min(Math.round(rawPercentage), 100);

  // Status and color determination based on mode and thresholds
  let barColor = 'bg-emerald-500';
  let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  let statusText = '';

  if (isSpending) {
    const remaining = targetVal - currentVal;
    if (rawPercentage >= 100) {
      barColor = 'bg-rose-500 shadow-sm shadow-rose-500/50';
      badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      statusText = `Exceeded limit by ₦${Math.abs(remaining).toLocaleString('en-NG')}`;
    } else if (rawPercentage >= 75) {
      barColor = 'bg-amber-400';
      badgeColor = 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      statusText = `₦${remaining.toLocaleString('en-NG')} remaining this month`;
    } else {
      barColor = 'bg-emerald-500';
      badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      statusText = `₦${remaining.toLocaleString('en-NG')} remaining this month`;
    }
  } else {
    // Savings Goal mode
    const leftToGoal = targetVal - currentVal;
    if (rawPercentage >= 100) {
      barColor = 'bg-emerald-400 shadow-sm shadow-emerald-400/50';
      badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      statusText = 'Monthly savings goal achieved! 🎉';
    } else if (rawPercentage >= 50) {
      barColor = 'bg-amber-400';
      badgeColor = 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      statusText = `₦${leftToGoal.toLocaleString('en-NG')} to reach goal`;
    } else {
      barColor = 'bg-blue-500';
      badgeColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      statusText = `₦${leftToGoal.toLocaleString('en-NG')} to reach goal`;
    }
  }

  return (
    <div className="glass p-5 sm:p-6 rounded-2xl mb-6 shadow-xl relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* BALANCE HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-xs sm:text-sm font-medium">Wallet Balance</p>
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold border border-green-500/30">
              Live NGN
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 transition-all duration-300 text-white font-mono">
            {visible ? `₦${balance.toLocaleString('en-NG')}` : '••••••••'}
          </h2>
        </div>

        <button
          onClick={onToggleVisible}
          className="p-3 rounded-full hover:bg-white/10 transition-colors text-yellow-400 text-2xl flex items-center justify-center cursor-pointer"
          title={visible ? 'Hide balance' : 'Show balance'}
        >
          <i className={`fas ${visible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
        </button>
      </div>

      {/* QUICK ACTIONS ROW */}
      <div className="flex items-center gap-3 pt-2 pb-5 border-b border-white/10">
        <button
          onClick={onOpenFund}
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-yellow-400/20"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          <span>Fund Wallet</span>
        </button>
        <button
          onClick={onOpenTransfer}
          className="flex-1 glass hover:bg-white/15 text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <i className="fa-solid fa-paper-plane text-xs text-yellow-400"></i>
          <span>Transfer</span>
        </button>
      </div>

      {/* MONTHLY GOAL & PROGRESS BAR SECTION */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <i
              className={`fa-solid ${
                isSpending ? 'fa-gauge-high text-yellow-400' : 'fa-piggy-bank text-emerald-400'
              } text-xs`}
            ></i>
            <span className="text-xs font-semibold text-gray-200">
              {isSpending ? 'Monthly Spending Limit' : 'Monthly Savings Goal'}
            </span>
          </div>

          <button
            onClick={onOpenGoalSettings}
            className="text-[11px] text-yellow-400 hover:text-yellow-300 font-medium transition flex items-center gap-1 cursor-pointer hover:underline"
            title="Adjust target amount or tracking mode"
          >
            <i className="fa-solid fa-pen-to-square text-[10px]"></i>
            <span>Edit</span>
          </button>
        </div>

        {/* METRICS ROW */}
        <div className="flex items-baseline justify-between text-xs mb-1.5 font-mono tabular-nums">
          <span className="text-gray-300">
            {visible ? (
              <>
                <strong className="text-white font-semibold">
                  ₦{currentVal.toLocaleString('en-NG')}
                </strong>
                <span className="text-gray-400"> / ₦{targetVal.toLocaleString('en-NG')}</span>
              </>
            ) : (
              '•••••• / ••••••'
            )}
          </span>
          <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded border ${badgeColor}`}>
            {Math.round(rawPercentage)}%
          </span>
        </div>

        {/* DYNAMIC PROGRESS BAR TRACK */}
        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/5 relative">
          <div
            className={`h-full rounded-full ${barColor} transition-all duration-500 ease-out`}
            style={{ width: `${clampedPercentage}%` }}
          />
        </div>

        {/* STATUS HELPER LINE */}
        <div className="flex items-center justify-between mt-2 text-[11px] text-gray-400">
          <span className="truncate">{statusText}</span>
          <span className="text-[10px] text-gray-500 font-medium flex-shrink-0 ml-2">
            This Month
          </span>
        </div>
      </div>
    </div>
  );
};
