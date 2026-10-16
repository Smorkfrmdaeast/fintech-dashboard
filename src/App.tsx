import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ProfileCard } from './components/ProfileCard';
import { PromoCarousel } from './components/PromoCarousel';
import { WalletCard } from './components/WalletCard';
import { QuickActions } from './components/QuickActions';
import { AnalyticsChart } from './components/AnalyticsChart';
import { TransactionHistory } from './components/TransactionHistory';
import { PaymentModal } from './components/PaymentModal';
import { FundModal } from './components/FundModal';
import { GoalSettingsModal } from './components/GoalSettingsModal';
import { FloatingSocial } from './components/FloatingSocial';
import { Toast } from './components/Toast';
import { AuthScreen } from './components/AuthScreen';
import { PaymentCategory, Transaction, BudgetGoal } from './types';

function generateAccountNumber(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export const App: React.FC = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('loggedInEmail') || 'user@example.com';
  });

  const [accountNumber, setAccountNumber] = useState<string>(() => {
    const existing = localStorage.getItem('accountNumber');
    if (existing) return existing;
    const generated = generateAccountNumber();
    localStorage.setItem('accountNumber', generated);
    return generated;
  });

  // Wallet & Transaction State
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved !== null ? Number(saved) : 120000;
  });

  const [visible, setVisible] = useState<boolean>(() => {
    const saved = localStorage.getItem('balanceVisible');
    return saved !== null ? saved === 'true' : true;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('tx');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Default initial mock transactions matching the fintech experience
    return [
      {
        id: 'tx-1',
        type: 'Received',
        amt: 50000,
        label: 'Transfer from Smork Tech',
        timestamp: 'Today, 10:14 AM',
      },
      {
        id: 'tx-2',
        type: 'Payment',
        amt: -3500,
        label: 'Airtime to MTN (08031234567)',
        timestamp: 'Yesterday, 4:20 PM',
      },
      {
        id: 'tx-3',
        type: 'Payment',
        amt: -12000,
        label: 'Electricity to IKEDC (019283746)',
        timestamp: 'Oct 14, 2:10 PM',
      },
      {
        id: 'tx-4',
        type: 'Funded',
        amt: 25000,
        label: 'Funded via Bank Transfer',
        timestamp: 'Oct 12, 09:30 AM',
      },
    ];
  });

  // Monthly Budget Goal State
  const [budgetGoal, setBudgetGoal] = useState<BudgetGoal>(() => {
    try {
      const saved = localStorage.getItem('budgetGoal');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      mode: 'spending_limit',
      targetAmount: 100000,
      period: 'monthly',
    };
  });

  // Calculate monthly spent amount from debited transactions
  const monthlySpent = useMemo(() => {
    return transactions
      .filter((t) => t.amt < 0)
      .reduce((acc, t) => acc + Math.abs(t.amt), 0);
  }, [transactions]);

  // Modals & UI State
  const [activePaymentCategory, setActivePaymentCategory] = useState<PaymentCategory | null>(null);
  const [isFundOpen, setIsFundOpen] = useState<boolean>(false);
  const [isGoalSettingsOpen, setIsGoalSettingsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('walletBalance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('balanceVisible', visible.toString());
  }, [visible]);

  useEffect(() => {
    localStorage.setItem('tx', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budgetGoal', JSON.stringify(budgetGoal));
  }, [budgetGoal]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    let acct = localStorage.getItem('accountNumber');
    if (!acct) {
      acct = generateAccountNumber();
      localStorage.setItem('accountNumber', acct);
    }
    setAccountNumber(acct);
    showToast(`Welcome back, ${email.split('@')[0]}! 👋`);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInEmail');
    localStorage.removeItem('accountNumber');
    setIsLoggedIn(false);
    showToast('Logged out successfully');
  };

  const handlePay = (amt: number, provider: string, account: string) => {
    if (!activePaymentCategory) return;
    if (amt > balance) {
      showToast('Insufficient wallet balance ❌');
      return;
    }

    const newBalance = balance - amt;
    setBalance(newBalance);

    const isBank = activePaymentCategory === 'Bank';
    const txType = isBank ? 'Sent' : 'Payment';
    const label = isBank
      ? `Sent to ${provider} (${account})`
      : `${activePaymentCategory} to ${provider} (${account})`;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: txType,
      amt: -amt,
      label,
      timestamp: 'Just now',
    };

    setTransactions((prev) => [newTx, ...prev]);
    setActivePaymentCategory(null);
    showToast(`Paid ₦${amt.toLocaleString()} to ${provider} ✅`);
  };

  const handleFund = (amt: number, method: string) => {
    const newBalance = balance + amt;
    setBalance(newBalance);

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'Funded',
      amt,
      label: `Funded via ${method}`,
      timestamp: 'Just now',
    };

    setTransactions((prev) => [newTx, ...prev]);
    setIsFundOpen(false);
    showToast(`Wallet credited with ₦${amt.toLocaleString()} ✅`);
  };

  const handleSaveGoal = (updatedGoal: BudgetGoal) => {
    setBudgetGoal(updatedGoal);
    setIsGoalSettingsOpen(false);
    showToast(
      updatedGoal.mode === 'spending_limit'
        ? `Monthly spending limit set to ₦${updatedGoal.targetAmount.toLocaleString()} ✅`
        : `Monthly savings goal set to ₦${updatedGoal.targetAmount.toLocaleString()} 🎯`
    );
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your transaction history?')) {
      setTransactions([]);
      showToast('Transaction history cleared');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen">
        <AuthScreen onLoginSuccess={handleLoginSuccess} />
        <FloatingSocial />
        <Toast message={toastMessage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-lg mx-auto pb-24 relative">
      {/* HEADER */}
      <Header onLogout={handleLogout} />

      {/* PROFILE CARD */}
      <ProfileCard email={userEmail} accountNumber={accountNumber} />

      {/* PROMO CAROUSEL */}
      <PromoCarousel />

      {/* WALLET BALANCE & GOAL TRACKER */}
      <WalletCard
        balance={balance}
        visible={visible}
        onToggleVisible={() => setVisible(!visible)}
        onOpenFund={() => setIsFundOpen(true)}
        onOpenTransfer={() => setActivePaymentCategory('Bank')}
        budgetGoal={budgetGoal}
        monthlySpent={monthlySpent}
        onOpenGoalSettings={() => setIsGoalSettingsOpen(true)}
      />

      {/* QUICK ACTIONS */}
      <QuickActions onSelectAction={(category) => setActivePaymentCategory(category)} />

      {/* ANALYTICS CHART */}
      <AnalyticsChart transactions={transactions} />

      {/* TRANSACTION HISTORY */}
      <TransactionHistory
        transactions={transactions}
        onClearHistory={handleClearHistory}
      />

      {/* PAYMENT MODAL */}
      {activePaymentCategory && (
        <PaymentModal
          category={activePaymentCategory}
          balance={balance}
          onClose={() => setActivePaymentCategory(null)}
          onPay={handlePay}
        />
      )}

      {/* FUND MODAL */}
      {isFundOpen && (
        <FundModal
          onClose={() => setIsFundOpen(false)}
          onFund={handleFund}
        />
      )}

      {/* GOAL SETTINGS MODAL */}
      {isGoalSettingsOpen && (
        <GoalSettingsModal
          currentGoal={budgetGoal}
          onClose={() => setIsGoalSettingsOpen(false)}
          onSave={handleSaveGoal}
        />
      )}

      {/* FLOATING SOCIAL & CONTACT MENU */}
      <FloatingSocial />

      {/* TOAST FEEDBACK */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
