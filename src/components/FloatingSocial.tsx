import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../data/providers';

export const FloatingSocial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2.5 z-40">
      {isOpen && (
        <div className="flex flex-col gap-2 mb-1 fade-in items-end">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-2 rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition-all duration-200 border border-white/20 bg-gray-900/80 backdrop-blur-md"
              title={link.name}
            >
              <i className={`${link.iconClass} ${link.textColor} text-xl`}></i>
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle contact links"
        className="bg-yellow-400 hover:bg-yellow-300 w-14 h-14 rounded-full text-black text-2xl flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        title="Contact & Socials"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-xl"></i>
        ) : (
          <span>📱</span>
        )}
      </button>
    </div>
  );
};
