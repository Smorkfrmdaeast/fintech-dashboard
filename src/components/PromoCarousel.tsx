import React, { useState, useEffect } from 'react';
import { PROMO_SLIDES } from '../data/providers';

export const PromoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="glass overflow-hidden relative rounded-2xl mb-6 shadow-lg group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {PROMO_SLIDES.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full flex-shrink-0 p-5 text-center font-semibold text-base sm:text-lg bg-gradient-to-r ${slide.gradient} ${slide.textColor} flex items-center justify-center select-none shadow-inner`}
          >
            {slide.text}
          </div>
        ))}
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1.5 pb-1">
        {PROMO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentIndex === index
                ? 'w-6 bg-white shadow-sm'
                : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
