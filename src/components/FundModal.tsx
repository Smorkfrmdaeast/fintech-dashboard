import React, { useState } from 'react';

interface FundModalProps {
  onClose: () => void;
  onFund: (amount: number, method: string) => void;
}

export const FundModal: React.FC<FundModalProps> = ({ onClose, onFund }) => {
  const [amount, setAmount] = useState('20000');
  const [method, setMethod] = useState('Bank Transfer');
  const [error, setError] = useState('');

  const presetAmounts = [5000, 10000, 20000, 50000, 100000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!amount || isNaN(num) || num <= 0) {
      setError('Please enter a valid top-up amount');
      return;
    }
    onFund(num, method);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-modal p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-white/15 fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-wallet text-yellow-400"></i>
            <span>Fund Wallet</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-1 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {error && (
          <div className="mb-3 p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Funding Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Bank Transfer', 'Debit Card', 'USSD'].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`p-2 rounded-xl text-xs font-medium transition cursor-pointer border ${
                    method === m
                      ? 'bg-yellow-400 text-black border-yellow-400 font-bold'
                      : 'glass text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Top-up Amount (₦)
            </label>
            <input
              type="number"
              placeholder="e.g. 20000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt.toString())}
                className="px-2.5 py-1 text-xs rounded-lg glass hover:bg-yellow-400/20 text-gray-300 hover:text-yellow-400 border border-white/10 cursor-pointer transition"
              >
                +₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer shadow-md hover:shadow-yellow-400/25"
            >
              Confirm Deposit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 text-gray-400 hover:text-gray-200 font-medium transition w-full text-center text-xs py-1 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
