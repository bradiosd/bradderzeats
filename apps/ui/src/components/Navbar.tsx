import React from "react";
import { ModeToggle } from "./mode-toggle";
import { config } from "../config";
import { FaInstagram, FaFacebook, FaYoutubeSquare } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const Navbar: React.FC = () => {
  return (
    <header className="border-b dark:border-brand-green/20 bg-white dark:bg-brand-black">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Bradders Eats Logo"
          className="h-80 w-auto mb-4"
        />
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <div className="flex space-x-4">
            <a
              href={config.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark-green dark:text-white hover:text-brand-green"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href={config.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark-green dark:text-white hover:text-brand-green"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href={config.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark-green dark:text-white hover:text-brand-green"
            >
              <FaYoutubeSquare size={24} />
            </a>
            <a
              href={config.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark-green dark:text-white hover:text-brand-green"
            >
              <SiTiktok size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 