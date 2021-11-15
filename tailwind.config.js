const colors = require('./colors.json');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      spacing: {
        '50vh': '50vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
