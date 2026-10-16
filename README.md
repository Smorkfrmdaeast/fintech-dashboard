# 💳 SMORK'S PAYDOM

A modern, responsive, and interactive fintech dashboard rewritten in **React 19, TypeScript, Vite, and Tailwind CSS**. Designed to simulate a real-world fintech experience with wallet management, real-time balance toggles, bill payments, money transfers, transaction analytics, and smooth glassmorphic UX—fully branded as **SMORK'S PAYDOM**.

---

## 🛠 Features

### Core Features
- 🔐 **Authentication System**: Login & Signup system with instant client validation and persistent `localStorage` support.
- 💳 **Wallet Management**: Instant balance viewing with eye toggle visibility control (show/hide balance).
- 🎯 **Monthly Spending Limit & Savings Goal**: Configurable target tracking with dynamic, threshold-responsive progress bar (Emerald $\rightarrow$ Amber $\rightarrow$ Rose) embedded directly in the WalletCard.
- 💰 **Fund Wallet**: Multiple simulated deposit channels (Bank Transfer, Debit Card, USSD) with preset amount chips.
- 💸 **Transfers & Bill Payments**: 
  - **Bank Transfers**: Full directory of top Nigerian banks (Access Bank, GTBank, Zenith, First Bank, UBA, Kuda, Opay, PalmPay, Moniepoint, etc.).
  - **Airtime & Data**: Instant recharge for MTN, Airtel, Glo, 9mobile with custom amounts.
  - **Electricity Bills**: IKEDC, EEDC, PHED, IBEDC, AEDC, BEDC, KEDCO.
  - **Cable TV**: DSTV, GOTV, Startimes.
  - **Internet Subscriptions**: Spectranet, Smile, IPNX, Swift Networks.
- 📊 **Transaction Analytics Chart**: High-DPI canvas-rendered bar chart displaying the last 5 activities with dynamic height and amount labels.
- 📜 **Persistent Transaction History**: Color-coded records for Sent, Received, Funded, and Bill Payments with timestamps and clear option.
- 🎠 **Auto-Rotating Promo Carousel**: Smooth 4-second cycling through fintech promotions with manual indicators.
- 📱 **Floating Contact & Social Hub**: Quick-access modal for Instagram, Facebook, LinkedIn, GitHub, and direct email to developer (`ifeanyinuels32@gmail.com`).
- ⚡ **Toast Feedback**: Non-intrusive interactive alerts confirming every operation.

---

## 📦 Project Structure

```
smorks-paydom/
├── src/
│   ├── components/
│   │   ├── AnalyticsChart.tsx    # Canvas-based activity chart
│   │   ├── AuthScreen.tsx        # Login & Signup authentication
│   │   ├── FloatingSocial.tsx    # Expandable floating social hub
│   │   ├── FundModal.tsx         # Deposit & top-up modal
│   │   ├── Header.tsx            # App bar & logout control
│   │   ├── PaymentModal.tsx      # Bill payment & bank transfer modal
│   │   ├── ProfileCard.tsx       # User avatar & copyable 10-digit account number
│   │   ├── PromoCarousel.tsx     # Auto-rotating promotion banners
│   │   ├── QuickActions.tsx      # Services & utility grid
│   │   ├── Toast.tsx             # Pop-up feedback notification
│   │   ├── TransactionHistory.tsx# Transaction feed with status icons
│   │   └── WalletCard.tsx        # Balance card with eye toggle & quick actions
│   ├── data/
│   │   └── providers.ts          # Banks, utility providers, and social data
│   ├── types.ts                  # TypeScript models and interfaces
│   ├── App.tsx                   # Main stateful dashboard controller
│   ├── index.css                 # Tailwind CSS & glassmorphic styles
│   └── main.tsx                  # React root entry point
├── index.html                    # HTML entry point with metadata
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite configuration
```

---

## 🚀 Development & Build

- **Start Dev Server**: `npm run dev` (starts on `http://0.0.0.0:3000`)
- **Build Production**: `npm run build`
- **Preview Build**: `npm run preview`

---

## 🎯 Author
**Smorkfrmdaeast** – Fullstack Developer, Mobile Developer, and Tech Enthusiast.
Connect via the floating dashboard button or socials.
