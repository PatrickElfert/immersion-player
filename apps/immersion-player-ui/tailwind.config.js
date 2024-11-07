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
        surface: '#202124',
        primary: '#08CF65',
        secondary: '#FFD042',
      },
      backgroundImage: (theme) => ({
        'primary-gradient': `linear-gradient(to bottom right, ${theme(
          'colors.primary'
        )}, ${theme('colors.secondary')})`,
      }),
      boxShadow: {
        "inner-glow": "4px 0 30px rgba(255,255,255,0.08) inset",
        "left-glow": "2px -35px 30px 15px rgba(255,255,255,0.08)"
      },
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
