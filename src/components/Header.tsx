import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💳</span>
        <h1 className="font-bold text-xl tracking-wide text-white">
          SMORK'S PAYDOM
        </h1>
      </div>
      <button
        onClick={onLogout}
        className="text-red-400 font-semibold hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10 text-sm flex items-center gap-1.5 cursor-pointer"
        title="Sign out of your account"
      >
        <i className="fa-solid fa-right-from-bracket text-xs"></i>
        <span>Logout</span>
      </button>
    </header>
  );
};
