import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onClearHistory?: () => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  onClearHistory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return transactions;
    return transactions.filter((t) => {
      const labelMatch = (t.label || '').toLowerCase().includes(query);
      const typeMatch = (t.type || '').toLowerCase().includes(query);
      return labelMatch || typeMatch;
    });
  }, [transactions, searchQuery]);

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

      {/* SEARCH INPUT FIELD */}
      {transactions.length > 0 && (
        <div className="relative mb-3.5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <i className="fa-solid fa-magnifying-glass text-xs"></i>
          </div>
          <input
            type="text"
            placeholder="Search transactions by label, provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 bg-black/30 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition cursor-pointer"
              title="Clear search"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          )}
        </div>
      )}

      {/* SEARCH STATS / RESULTS HINT */}
      {searchQuery.trim() && transactions.length > 0 && (
        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2 px-1">
          <span>
            Found {filteredTransactions.length} of {transactions.length} transactions
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-yellow-400 hover:text-yellow-300 underline cursor-pointer"
          >
            Reset
          </button>
        </div>
      )}

      {/* TRANSACTION LIST */}
      <div className="space-y-2">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fa-solid fa-receipt text-3xl mb-2 text-gray-600 block"></i>
            <p className="text-sm">No transactions yet</p>
            <p className="text-xs text-gray-500 mt-1">
              Top up your balance or pay bills to see records here.
            </p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fa-solid fa-filter-circle-xmark text-2xl mb-2 text-gray-500 block"></i>
            <p className="text-sm text-gray-300">No matching transactions</p>
            <p className="text-xs text-gray-500 mt-1">
              No records found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredTransactions.slice(0, 10).map((t) => {
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
                  className="font-bold text-sm tracking-wide flex-shrink-0 font-mono tabular-nums"
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
