import React from 'react';
import { useTheme } from './theme-provider';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <footer className={`py-6 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark-green/70'}`}>
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Bradders Eats. All rights reserved.</p>
        <div className="mt-2 text-sm">
          <a
            href="/privacy"
            className="hover:text-brand-green mx-2"
          >
            Privacy Policy
          </a>
          <span>•</span>
          <a
            href="/terms"
            className="hover:text-brand-green mx-2"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 