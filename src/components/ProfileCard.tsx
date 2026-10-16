import React, { useState } from 'react';

interface ProfileCardProps {
  email: string;
  accountNumber: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ email, accountNumber }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    email
  )}&background=0D8ABC&color=fff&size=64`;

  return (
    <div className="glass p-4 rounded-2xl mb-6 flex items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={avatarUrl}
          alt="User Profile"
          className="w-12 h-12 rounded-full ring-2 ring-yellow-400/30 flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-gray-300 font-semibold text-sm truncate" title={email}>
            {email}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-400">Account:</span>
            <span className="text-yellow-400 font-bold tracking-wider font-mono text-sm">
              {accountNumber}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="glass px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-yellow-400 transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
        title="Copy account number"
      >
        <i className={copied ? 'fa-solid fa-check text-green-400' : 'fa-regular fa-copy'}></i>
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
};
