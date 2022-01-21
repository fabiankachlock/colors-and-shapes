const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          dark: '#244985',
          light: '#60a5fa'
        },
        secondary: {
          dark: '#fb4d3d',
          light: '#a32c2c'
        },
        main: {
          dark: '#292524',
          light: '#d6d3d1'
        },
        text: {
          dark: '#bac4d2',
          light: '#121a0d'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
};
