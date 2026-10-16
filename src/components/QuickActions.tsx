import React from 'react';
import { PaymentCategory } from '../types';

interface QuickActionsProps {
  onSelectAction: (category: PaymentCategory) => void;
}

const ACTION_CONFIG: { category: PaymentCategory; label: string; icon: string; color: string }[] = [
  { category: 'Bank', label: 'Bank', icon: 'fa-solid fa-building-columns', color: 'text-yellow-400' },
  { category: 'Airtime', label: 'Airtime', icon: 'fa-solid fa-mobile-screen-button', color: 'text-green-400' },
  { category: 'TV', label: 'TV', icon: 'fa-solid fa-tv', color: 'text-purple-400' },
  { category: 'Electricity', label: 'Electricity', icon: 'fa-solid fa-bolt', color: 'text-amber-400' },
  { category: 'Internet', label: 'Internet', icon: 'fa-solid fa-wifi', color: 'text-blue-400' },
  { category: 'Data', label: 'Data', icon: 'fa-solid fa-network-wired', color: 'text-cyan-400' },
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onSelectAction }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-semibold text-sm text-gray-300">Quick Services & Bills</h3>
        <span className="text-xs text-gray-400">Zero charges</span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {ACTION_CONFIG.map(({ category, label, icon, color }) => (
          <button
            key={category}
            onClick={() => onSelectAction(category)}
            className="glass p-3 sm:p-4 rounded-xl font-semibold flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-95 group text-center"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <i className={`${icon} ${color} text-lg`}></i>
            </div>
            <span className="text-sm text-gray-200 group-hover:text-white">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
