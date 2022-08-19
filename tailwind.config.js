/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      fontFamily: {
        body: ['Open Sans', 'sans-serif'],
      },
      keyframes: {
        ['trans-vertical-active-menu']: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(100%)' },
        },
        ['trans-vertical-active-menu-reverse']: {
          '0%': { transform: 'scaleY(100%)' },
          '100%': { transform: 'scaleY(0)' },
        },
      },
    },
  },
  plugins: [],
};
