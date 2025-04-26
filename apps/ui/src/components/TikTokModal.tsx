import React from 'react';
import { Dialog } from '@headlessui/react';
import { useTheme } from './theme-provider';

interface TikTokModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TikTokModal({ isOpen, onClose }: TikTokModalProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

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

          {/* Video Player */}
          <div className="p-4">
            <video
              className="w-full rounded-lg"
              controls
              autoPlay
              loop
              playsInline
              src="https://v45.tiktokcdn-eu.com/b51b82198b0f9368b2c119005ef57961/680e1f82/video/tos/no1a/tos-no1a-ve-0068-no/o03h4ZkEKwQ1DXeoAWgIRYFFTf4zEsEkFDsBgW/?a=1233&bti=NDU3ZjAwOg%3D%3D&ch=0&cr=3&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C&cv=1&br=4050&bt=2025&cs=0&ds=3&ft=bCkKJmwKPD12NQGgHh-Uxf15hY3W3wv25XcAp&mime_type=video_mp4&qs=0&rc=Nzo5aDk2ZjM1NmczN2ZkPEBpM3Q1anU5cmZkMzMzbzczNUA1YTYvMWJhNTAxYTVjLl8vYSNvamppMmQ0ZjNhLS1kMTFzcw%3D%3D&vvpl=1&l=202504261213054667AECFD88BE7A56D39&btag=e0008d000"
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default TikTokModal; 