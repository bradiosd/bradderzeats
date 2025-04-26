import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useTheme } from './theme-provider';

interface TikTokModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TikTokModal({ isOpen, onClose }: TikTokModalProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    // Load TikTok embed script when modal opens
    if (isOpen) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up script when modal closes
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

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

          {/* TikTok Video */}
          <div className="p-4">
            <blockquote
              className="tiktok-embed"
              cite="https://www.tiktok.com/@bradderzeats/video/7497553588806339862"
              data-video-id="7497553588806339862"
              style={{ maxWidth: '605px', minWidth: '325px' }}
            >
              <section></section>
            </blockquote>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default TikTokModal; 