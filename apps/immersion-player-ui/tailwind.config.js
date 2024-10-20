const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      sans: [
        'Inter'
      ]
    },
    extend: {
      colors: {
        plum: '#0A0024',
        primary: '#ED1E79',
        secondary: '#F7CA40',
      },
      backgroundImage: (theme) => ({
        'primary-gradient': `linear-gradient(to bottom right, ${theme(
          'colors.primary'
        )}, ${theme('colors.secondary')})`,
      }),
      gridTemplateColumns: {
        root: '250px 1fr',
      },
      gridTemplateRows: {
        content: '80px 1fr',
      },
    },
  },
  plugins: [],
};
