import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CardGrid from './components/CardGrid';
import Modal from './components/Modal';
import { Card } from './types';
import { config } from './config';
import { initializeGoogleAnalytics } from './lib/analytics';
import { useAnalytics } from './hooks/useAnalytics';
import data from './data/cardTypes.json';
import { Toaster } from 'sonner';

const cardData = data as any;

const AppContent: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Use analytics hook
  useAnalytics();

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <CardGrid
          cards={cardData.cards}
          cardTypes={cardData.cardTypes}
          onSelectCard={handleSelectCard}
        />
      </main>
      <Footer />

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        card={selectedCard}
      />
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Google Analytics
    if (config.analytics.measurementId) {
      initializeGoogleAnalytics(config.analytics.measurementId);
    }
  }, []);

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey={config.theme.storageKey}>
        <Routes>
          <Route path="/" element={<AppContent />} />
          {/* Add more routes as needed */}
        </Routes>
        <Toaster position="top-right" />
      </ThemeProvider>
    </Router>
  );
};

export default App; 