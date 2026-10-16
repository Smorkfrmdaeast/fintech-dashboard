import React from 'react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onClearHistory?: () => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  onClearHistory,
}) => {
  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'Sent':
        return <i className="fas fa-arrow-up text-red-400"></i>;
      case 'Received':
        return <i className="fas fa-arrow-down text-green-400"></i>;
      case 'Funded':
        return <i className="fas fa-wallet text-yellow-400"></i>;
      case 'Payment':
        return <i className="fas fa-money-bill-wave text-blue-400"></i>;
      default:
        return <i className="fas fa-circle text-gray-400 text-xs"></i>;
    }
  };

  return (
    <div className="glass p-4 sm:p-5 rounded-xl mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-base text-white flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-yellow-400 text-sm"></i>
          <span>Transactions</span>
        </h3>
        {transactions.length > 0 && onClearHistory && (
          <button
            onClick={onClearHistory}
            className="text-xs text-gray-400 hover:text-red-400 transition cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fa-solid fa-receipt text-3xl mb-2 text-gray-600 block"></i>
            <p className="text-sm">No transactions yet</p>
            <p className="text-xs text-gray-500 mt-1">
              Top up your balance or pay bills to see records here.
            </p>
          </div>
        ) : (
          transactions.slice(0, 10).map((t) => {
            const isPositive = t.amt > 0;
            return (
              <div
                key={t.id}
                className="flex items-center justify-between p-2.5 rounded-lg tx-item fade-in border border-white/5"
              >
                <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    {getIcon(t.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-200 font-medium truncate">
                      {t.label || t.type}
                    </p>
                    {t.timestamp && (
                      <p className="text-[10px] text-gray-500">{t.timestamp}</p>
                    )}
                  </div>
                </div>

                <span
                  className="font-bold text-sm tracking-wide flex-shrink-0 font-mono"
                  style={{ color: isPositive ? '#22c55e' : '#ef4444' }}
                >
                  {isPositive ? '+' : '-'}₦{Math.abs(t.amt).toLocaleString('en-NG')}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
