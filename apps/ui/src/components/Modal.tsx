import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Card } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useSwipe } from '../hooks/useSwipe';
import { useTheme } from './theme-provider';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card | null;
}

function Modal({ isOpen, onClose, card }: ModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handlePreviousImage = () => {
    if (!card) return;
    setCurrentImageIndex((prev) => (prev === 0 ? card.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!card) return;
    setCurrentImageIndex((prev) => (prev === card.images.length - 1 ? 0 : prev + 1));
  };

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(handleNextImage, handlePreviousImage);

  if (!card) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/75" aria-hidden="true" onClick={onClose} />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`mx-auto max-w-2xl rounded-lg overflow-hidden relative ${isDarkMode ? 'bg-brand-black' : 'bg-white'}`}>
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full ${isDarkMode
              ? 'bg-brand-black text-brand-light hover:bg-brand-dark-green'
              : 'bg-white text-brand-dark-green hover:bg-brand-light'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Background Image */}
          <div
            className="relative h-64"
            style={{ backgroundColor: card.backgroundColor }}
          >
            {card.backgroundImage && (
              <img
                src={card.backgroundImage}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
            {/* Dark Overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `rgba(0, 0, 0, ${card.overlayOpacity})` }}
            />
            {/* Images Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center p-4"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {card.images.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className={`absolute left-4 z-10 p-2 rounded-full ${isDarkMode
                      ? 'bg-brand-black/50 text-brand-light hover:bg-brand-dark-green'
                      : 'bg-white/50 text-brand-dark-green hover:bg-white'
                      }`}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className={`absolute right-4 z-10 p-2 rounded-full ${isDarkMode
                      ? 'bg-brand-black/50 text-brand-light hover:bg-brand-dark-green'
                      : 'bg-white/50 text-brand-dark-green hover:bg-white'
                      }`}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={card.images[currentImageIndex].src}
                  alt={card.images[currentImageIndex].alt}
                  className={`max-h-full max-w-full object-contain ${card.images[currentImageIndex].invert ? 'invert' : ''}`}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <Dialog.Title className={`text-2xl font-bold ${isDarkMode ? 'text-brand-light' : 'text-brand-dark-green'}`}>
              {card.title}
            </Dialog.Title>
            <p className={`mt-4 text-lg font-medium ${isDarkMode ? 'text-brand-light' : 'text-brand-dark-green'}`}>
              {card.tagline}
            </p>
            <p className={`mt-4 whitespace-pre-line ${isDarkMode ? 'text-brand-light/80' : 'text-brand-dark-green/80'}`}>
              {card.description}
            </p>

            {/* URL Input and Visit Button */}
            <div className="mt-6 flex gap-4">
              <input
                type="text"
                readOnly
                value={card.url}
                className={`flex-1 px-4 py-2 rounded-lg border ${isDarkMode
                  ? 'bg-brand-black border-brand-green text-brand-light'
                  : 'bg-white border-brand-dark-green text-brand-dark-green'
                  }`}
              />
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-2 rounded-lg ${isDarkMode
                  ? 'bg-brand-green text-white hover:bg-brand-dark-green'
                  : 'bg-brand-dark-green text-white hover:bg-brand-green'
                  }`}
              >
                Visit
              </a>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Modal; 