import React, { useState } from 'react';
import { Card } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useSwipe } from '../hooks/useSwipe';
import { useTheme } from './theme-provider';

interface CardItemProps {
  card: Card;
  onClick: () => void;
}

export const CardItem: React.FC<CardItemProps> = ({ card, onClick }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    () => {
      const newIndex = (imageIndex + 1) % card.images.length;
      setImageIndex(newIndex);
    },
    () => {
      const newIndex = (imageIndex - 1 + card.images.length) % card.images.length;
      setImageIndex(newIndex);
    }
  );

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (imageIndex - 1 + card.images.length) % card.images.length;
    setImageIndex(newIndex);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (imageIndex + 1) % card.images.length;
    setImageIndex(newIndex);
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-xl overflow-hidden shadow-md transition-transform duration-200 transform hover:scale-[1.02] cursor-pointer ${isDarkMode ? 'bg-brand-dark-bg text-white' : 'bg-white text-brand-black'
        }`}
    >
      <div
        className="relative aspect-video overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={card.images[imageIndex].src}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        {card.images.length > 1 && (
          <>
            <button
              onClick={handlePreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {card.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === imageIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{card.title}</h2>
        <p className={`text-sm mb-2 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark-green/70'}`}>
          {card.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {card.types.map((type) => (
            <span
              key={type}
              className={`text-xs px-2 py-1 rounded-full ${isDarkMode
                ? 'bg-brand-black text-brand-light'
                : 'bg-brand-light text-brand-dark-green'
                }`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}; 