const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        'Inter'
      ]
    },
    extend: {
      gridTemplateColumns: {
        root: '250px 1fr',
      },
      gridTemplateRows: {
        content: '80px 1fr',
      },
    },
  },
  plugins: [heroui()],
};
