export type TransactionType = 'Sent' | 'Received' | 'Funded' | 'Payment';

export interface Transaction {
  id: string;
  type: TransactionType;
  amt: number;
  label: string;
  timestamp: string;
}

export type PaymentCategory = 'Bank' | 'Airtime' | 'TV' | 'Electricity' | 'Internet' | 'Data';

export interface UserAccount {
  email: string;
  password?: string;
  accountNumber?: string;
}

export type BudgetGoalMode = 'spending_limit' | 'savings_goal';

export interface BudgetGoal {
  mode: BudgetGoalMode;
  targetAmount: number;
  period: 'monthly';
}

