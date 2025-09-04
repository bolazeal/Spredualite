/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'spred-dark': '#343333',
        'spred-orange': '#F45303',
        'spred-orange-light': '#F15A24',
        'spred-gray': '#464646',
        'spred-light-gray': '#E0E0E0',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
