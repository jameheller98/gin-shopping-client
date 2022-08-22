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
      animation: {
        'trans-sub-menu-in': 'trans-sub-menu-in 2s ease-in-out',
        'trans-sub-menu-out':
          'trans-sub-menu-out 0.5s cubic-bezier(0, 1, 0, 1) both',
      },
      keyframes: {
        'trans-sub-menu-in': {
          '0%': { maxHeight: 0, width: '0%' },
          '20%': { maxHeight: 40 },
          '35%': { width: '100%' },
          '40%': { maxHeight: 40 },
          '100%': { maxHeight: 1000 },
        },
        'trans-sub-menu-out': {
          '0%': { maxHeight: 1000 },
          '100%': { maxHeight: 0 },
        },
      },
    },
  },
  plugins: [],
};
