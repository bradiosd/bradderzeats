import React, { useState, useEffect } from 'react';
import data from './data/cardTypes.json';
import Modal from './components/Modal';
import { Card, CardData } from './types';
import { FaSun, FaMoon, FaChevronDown, FaInstagram, FaFacebook, FaYoutubeSquare } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const cardData: CardData = data;

function App() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const filteredCards = selectedType === 'all'
    ? cardData.cards
    : cardData.cards.filter(card => card.types.includes(selectedType));

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-brand-black' : 'bg-white'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-brand-black' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Bradders Eats Logo"
            className="h-80 w-auto mb-4"
          />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${isDarkMode
              ? 'bg-brand-green text-white hover:bg-brand-dark-green'
              : 'bg-brand-black text-white hover:bg-brand-dark-green'
              }`}
          >
            {isDarkMode ? FaSun({ size: 20 }) : FaMoon({ size: 20 })}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Filters */}
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter Dropdown */}
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-full px-4 py-2 rounded-lg flex items-center justify-between ${isDarkMode
                ? 'bg-brand-black text-brand-light border border-brand-green'
                : 'bg-white text-brand-dark-green border border-brand-dark-green'
                }`}
            >
              <span className="flex items-center space-x-2">
                <span>{cardData.cardTypes.find(type => type.id === selectedType)?.icon || '🍽️'}</span>
                <span>{cardData.cardTypes.find(type => type.id === selectedType)?.name || 'All'}</span>
              </span>
              {FaChevronDown({ size: 20, className: `transform transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}` })}
            </button>
            {isFilterOpen && (
              <div className={`mt-2 rounded-lg overflow-hidden ${isDarkMode ? 'bg-brand-black border border-brand-green' : 'bg-white border border-brand-dark-green'
                }`}>
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-opacity-10 hover:bg-brand-green ${selectedType === 'all'
                    ? 'bg-brand-green text-white'
                    : isDarkMode
                      ? 'text-brand-light'
                      : 'text-brand-dark-green'
                    }`}
                >
                  All
                </button>
                {cardData.cardTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type.id);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-opacity-10 hover:bg-brand-green flex items-center space-x-2 ${selectedType === type.id
                      ? 'bg-brand-green text-white'
                      : isDarkMode
                        ? 'text-brand-light'
                        : 'text-brand-dark-green'
                      }`}
                  >
                    <span>{type.icon}</span>
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex justify-center space-x-4">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-full ${selectedType === 'all'
                ? 'bg-brand-green text-white'
                : isDarkMode
                  ? 'bg-brand-black text-brand-light hover:bg-brand-dark-green'
                  : 'bg-white text-brand-dark-green hover:bg-brand-light'
                }`}
            >
              All
            </button>
            {cardData.cardTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 ${selectedType === type.id
                  ? 'bg-brand-green text-white'
                  : isDarkMode
                    ? 'bg-brand-black text-brand-light hover:bg-brand-dark-green'
                    : 'bg-white text-brand-dark-green hover:bg-brand-light'
                  }`}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {filteredCards.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-xl ${isDarkMode ? 'text-brand-light' : 'text-brand-dark-green'}`}>
                No Codes Found
              </p>
              <p className={`mt-2 ${isDarkMode ? 'text-brand-light/60' : 'text-brand-dark-green/60'}`}>
                Try selecting a different category
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${filteredCards.length === 1
              ? 'grid-cols-1 max-w-md mx-auto'
              : filteredCards.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
              {filteredCards.map((card, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCard(card);
                    setIsOpen(true);
                  }}
                  className={`${isDarkMode ? 'bg-brand-black border-brand-green' : 'bg-white border-brand-dark-green'
                    } border rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 relative`}
                >
                  {/* Background Image */}
                  <div className="relative h-48">
                    <img
                      src={card.background}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50" />
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
                  <div className="p-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-brand-light' : 'text-brand-dark-green'
                      }`}>
                      {card.title}
                    </h3>
                    <p className={`mt-2 text-sm font-medium ${isDarkMode ? 'text-brand-light' : 'text-brand-dark-green'
                      }`}>
                      {card.tagline}
                    </p>
                    <p className={`mt-2 text-sm ${isDarkMode ? 'text-brand-light/80' : 'text-brand-dark-green/80'
                      } whitespace-pre-line`}>
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-brand-black border-t border-brand-green' : 'bg-white border-t border-brand-dark-green'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <p className={`text-sm ${isDarkMode ? 'text-brand-light/60' : 'text-brand-dark-green/60'}`}>
              Follow me on social media
            </p>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/bradderzeats"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-brand-light hover:text-brand-green' : 'text-brand-dark-green hover:text-brand-green'} transition-colors duration-200`}
                aria-label="Instagram"
              >
                {FaInstagram({ size: 24 })}
              </a>
              <a
                href="https://facebook.com/bradderzeats"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-brand-light hover:text-brand-green' : 'text-brand-dark-green hover:text-brand-green'} transition-colors duration-200`}
                aria-label="Facebook"
              >
                {FaFacebook({ size: 24 })}
              </a>
              <a
                href="https://tiktok.com/@bradderzeats"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-brand-light hover:text-brand-green' : 'text-brand-dark-green hover:text-brand-green'} transition-colors duration-200`}
                aria-label="TikTok"
              >
                {SiTiktok({ size: 24 })}
              </a>
              <a
                href="https://youtube.com/@bradderzeats"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-brand-light hover:text-brand-green' : 'text-brand-dark-green hover:text-brand-green'} transition-colors duration-200`}
                aria-label="YouTube"
              >
                {FaYoutubeSquare({ size: 24 })}
              </a>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-brand-light/40' : 'text-brand-dark-green/40'}`}>
              © {new Date().getFullYear()} Bradderz Eats. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        card={selectedCard}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App; 