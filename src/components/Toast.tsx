import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-24 z-50 max-w-xs bg-gray-950/95 text-white px-4 py-3 rounded-xl border border-yellow-400/40 shadow-2xl fade-in flex items-center gap-2.5">
      <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
      <p className="text-sm font-semibold text-gray-100">{message}</p>
    </div>
  );
};
