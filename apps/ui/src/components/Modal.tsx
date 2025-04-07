import React from 'react';
import { Dialog } from '@headlessui/react';
import { Card } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card | null;
  isDarkMode: boolean;
}

function Modal({ isOpen, onClose, card, isDarkMode }: ModalProps) {
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
            {/* Logo Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={card.logo.src}
                alt={card.logo.alt}
                style={{
                  width: card.logo.size.width,
                  height: card.logo.size.height
                }}
                className={`object-contain ${card.logo.invert ? 'invert' : ''}`}
              />
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
                Claim
              </a>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Modal; 