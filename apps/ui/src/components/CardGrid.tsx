import React, { useState } from 'react';
import { Card } from '../types';
import { CardItem } from './CardItem';
import { useTheme } from './theme-provider';
import { FaChevronDown } from 'react-icons/fa';

interface CardGridProps {
  cards: Card[];
  cardTypes: Array<{ id: string; name: string; icon: string }>;
  onSelectCard: (card: Card) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, cardTypes, onSelectCard }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const filteredCards = selectedType === 'all'
    ? cards
    : cards.filter(card => card.types.includes(selectedType));

  return (
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
              <span>{cardTypes.find(type => type.id === selectedType)?.icon || '🍽️'}</span>
              <span>{cardTypes.find(type => type.id === selectedType)?.name || 'All'}</span>
            </span>
            <FaChevronDown className={`transform transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
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
              {cardTypes.map((type) => (
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
          {cardTypes.map((type) => (
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
            {filteredCards.map((card) => (
              <CardItem
                key={card.title}
                card={card}
                onClick={() => onSelectCard(card)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CardGrid; 