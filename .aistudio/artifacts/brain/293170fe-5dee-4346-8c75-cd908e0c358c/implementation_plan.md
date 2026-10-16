# Monthly Spending Limit & Savings Goal Tracker

Empower SMORK'S PAYDOM users to set and track their monthly financial targets directly from the WalletCard with a real-time, color-responsive progress bar and goal management modal.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product decisions were confirmed through interactive preferences:
> - **Dual Mode Flexibility**: Users can toggle between a **Monthly Spending Limit** (monitoring outflows against a maximum budget cap) and a **Monthly Savings Goal** (tracking saved balance towards an accumulation target).
> - **Dynamic Color Feedback**: The progress bar dynamically shifts colors based on threshold stages (Emerald $\rightarrow$ Amber at 75% $\rightarrow$ Crimson above 90% or 100%), with contextual warning badges ("On Track", "Approaching Limit", "Limit Exceeded").
> - **Dedicated Goal Modal**: A sleek, direct "Set Target" / "Edit" control in the WalletCard opens a modal for updating the target amount and switching modes, with preset quick-target chips and persistent `localStorage` storage.

---

## 1. Overview & Core Concept

- **What It Does**: Adds personal finance budgeting directly into the primary wallet dashboard. Users set either a monthly spending limit (e.g. ₦100,000/month) or a savings target (e.g. ₦250,000). The WalletCard calculates the spent amount or saved amount in the current month, computes the percentage completion, and renders a smooth progress bar with amount remaining.
- **Target Audience / Persona**: Everyday fintech users who want guardrails against overspending or motivation to hit savings targets without navigating away from their main balance dashboard.
- **Key Value**: Provides instant financial awareness during everyday transfers and bill payments, turning the dashboard into an active financial copilot.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Zero-State / First View**: The WalletCard displays the current mode (e.g. "Monthly Budget: ₦100,000") with a progress bar, spent/target figures, and an "Edit Goal" button.
2. **Editing Target**: Clicking the "Edit Goal" button opens the `GoalSettingsModal`:
   - Toggle switch: `Monthly Spending Limit` vs `Monthly Savings Goal`.
   - Numeric input with instant formatting (e.g. ₦50,000, ₦100,000, ₦200,000 chips).
   - "Save Target" button persists choices and updates the UI instantly.
3. **Live Spending Updates**: Every time the user executes a bill payment, bank transfer, or wallet funding, the progress bar recalculates in real time.
4. **Visual Warning Thresholds**:
   - **< 75%**: Emerald green bar (`bg-emerald-500`), status "On Track".
   - **75% – 90%**: Warm amber bar (`bg-amber-400`), status "Nearing Limit".
   - **> 90% / Over 100%**: Bold crimson bar (`bg-rose-500` with subtle glow), status "Over Limit" and amount exceeded.

### Visual Identity & Theme
- **Surface**: Seamlessly integrates into the existing dark glassmorphic container (`rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.12)`).
- **Progress Track**: High-contrast dark groove (`bg-white/10` with rounded-full pill geometry and smooth `transition-all duration-500`).
- **Typography & Alignment**: Monospaced tabular numerals (`font-mono tabular-nums`) for currency figures and percentage labels to eliminate layout jump.
- **Anti-Slop Discipline**: Clean, unboxed text labels with bullet separators (`·`), no redundant pill badges, and natural editorial copywriting.

---

## 3. Key Product Decisions & Trade-Offs

- **Dual Mode (Spending vs Savings)**:
  - *Chosen Approach*: Single toggle in the setup modal allowing either mode. Spending tracks cumulative debits (`Payment` and `Sent`), while Savings tracks current wallet balance against a target.
  - *Why*: Eliminates clutter while addressing both types of fintech users (budget-conscious spenders and disciplined savers).
- **Automated Calculation from Transactions**:
  - *Chosen Approach*: Spend is derived directly from the transaction history for the current calendar month, keeping state strictly synchronized with the ledger.
  - *Why*: Prevents divergence between recorded transactions and budget state.
- **Local Persistence**:
  - *Chosen Approach*: Saved under `localStorage.getItem('budgetGoal')`.
  - *Why*: Zero server lag, private, and fully persistent across page refreshes.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                           App.tsx                           │
│  - walletBalance, transactions, budgetGoal state            │
│  - handles payBill, fundWallet, updateGoal                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
┌─────────────────────────┐   ┌──────────────────────────────┐
│      WalletCard.tsx     │   │     GoalSettingsModal.tsx    │
│  - Balance & eye toggle │   │  - Mode toggle: Spend/Save   │
│  - Dynamic Progress Bar │   │  - Target amount & quick chip│
│  - Status & remaining ₦ │   │  - Save / Cancel handlers    │
│  - "Edit Goal" trigger  │   └──────────────────────────────┘
└─────────────────────────┘
```

### Data Model & State
```typescript
export interface BudgetGoal {
  mode: 'spending_limit' | 'savings_goal';
  targetAmount: number;
  period: 'monthly';
}
```

### State Transitions & Handlers
- `handleUpdateGoal(newGoal: BudgetGoal)`: Saves to React state and updates `localStorage.setItem('budgetGoal', JSON.stringify(newGoal))`.
- Spending computation helper: Filters `transactions` where `type === 'Payment' || type === 'Sent'`, summing absolute amounts for the current month.
- Savings computation helper: Compares current `balance` against `targetAmount`.

---
