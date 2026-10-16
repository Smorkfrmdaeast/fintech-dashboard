import React, { useState, useEffect } from 'react';
import { PaymentCategory } from '../types';
import { PROVIDERS } from '../data/providers';

interface PaymentModalProps {
  category: PaymentCategory;
  balance: number;
  onClose: () => void;
  onPay: (amount: number, provider: string, account: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  category,
  balance,
  onClose,
  onPay,
}) => {
  const [provider, setProvider] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const providerList = PROVIDERS[category] || [];

  // Reset or preset default
  useEffect(() => {
    if (providerList.length > 0) {
      setProvider(providerList[0]);
    }
  }, [category]);

  const quickAmounts = category === 'Airtime' || category === 'Data'
    ? [500, 1000, 2000, 5000]
    : [2000, 5000, 10000, 20000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmt = Number(amount);
    if (!amount || isNaN(numAmt) || numAmt <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!provider) {
      setError('Please select a provider or bank');
      return;
    }

    if (!account.trim()) {
      setError(category === 'Bank' ? 'Please enter destination account' : 'Please enter account or phone number');
      return;
    }

    if (numAmt > balance) {
      setError(`Insufficient balance. Available: ₦${balance.toLocaleString()}`);
      return;
    }

    onPay(numAmt, provider, account.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-modal p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-white/15 fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{category} Payment</span>
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

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Select {category === 'Bank' ? 'Destination Bank' : 'Provider / Biller'}
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-yellow-400"
            >
              <option value="">Select Provider/Bank</option>
              {providerList.map((p) => (
                <option key={p} value={p} className="bg-gray-900 text-white">
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              {category === 'Bank'
                ? 'Account Number (10 digits)'
                : category === 'Airtime' || category === 'Data'
                ? 'Phone Number'
                : 'Account / Meter / Smartcard Number'}
            </label>
            <input
              type="text"
              placeholder={
                category === 'Bank'
                  ? '0123456789'
                  : category === 'Airtime'
                  ? '08012345678'
                  : 'Enter Account / Phone'
              }
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Amount (₦)
            </label>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
            />
          </div>

          {/* Quick chip buttons */}
          <div className="flex gap-1.5 flex-wrap pt-1">
            {quickAmounts.map((amt) => (
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
              Pay Now
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
