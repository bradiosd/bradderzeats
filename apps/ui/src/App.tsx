import React, { useState, useEffect } from 'react';
import data from './data/cardTypes.json';
import Modal from './components/Modal';

interface Card {
  id: number;
  title: string;
  types: string[];
  description: string;
  background: string;
  logo: {
    src: string;
    alt: string;
    size: {
      width: string;
      height: string;
    };
    invert: boolean;
  };
  url: string;
}

interface CardType {
  id: string;
  name: string;
  icon: string;
}

interface CardData {
  cardTypes: CardType[];
  cards: Card[];
}

const cardData: CardData = data;

function App() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const filteredCards = selectedType === 'all'
    ? cardData.cards
    : cardData.cards.filter(card => card.types.includes(selectedType));

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-brand-black' : 'bg-white'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-brand-black' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Bradders Eats Logo"
            className="h-32 w-auto mb-4"
          />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${isDarkMode
              ? 'bg-brand-green text-white hover:bg-brand-dark-green'
              : 'bg-brand-black text-white hover:bg-brand-dark-green'
              }`}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4">
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
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
            {filteredCards.map((card) => (
              <div
                key={card.id}
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
                  <p className={`mt-2 text-sm ${isDarkMode ? 'text-brand-light/80' : 'text-brand-dark-green/80'
                    }`}>
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

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