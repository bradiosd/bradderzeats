import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for combining Tailwind classes
const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs));
};

function App() {
  return (
    <div className={cn(
      "min-h-screen bg-gray-100",
      "flex flex-col"
    )}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to React
          </h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <div className="px-4 py-6 sm:px-0">
                <div className={cn(
                  "border-4 border-dashed border-gray-200 rounded-lg h-96",
                  "flex items-center justify-center"
                )}>
                  <p className="text-gray-500 text-xl">Start editing to see some magic happen!</p>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App; 