/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'green': '#40c165',
          'black': '#000000',
          'light': '#f5f5f5',
          'dark-green': '#06591e'
        }
      }
    },
  },
  plugins: [],
} 