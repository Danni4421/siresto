/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        background: '#F3F4F5',
        'dark-green': '#698269',
        'dark-cream': '#B99B6B',
        cream: '#F1DBBF',
        'dark-red': '#AA5656',
      },
      fontFamily: {
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [],
};
