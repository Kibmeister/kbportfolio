/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        'garet-heavy': ['garet-heavy', 'sans-serif'],
        'chalga-folk': ['chalga-folk', 'sans-serif'],
        'garet-book': ['garet-book', 'sans-serif'],
      },
      colors: {
        primary: '#F2F2E8',
        secondary: '#FF5800',
        tertiary: '#AEAC92',
        black: '#1E1E1D',
        lightblack: '#8C8C88',
        primaryVar: 'var(--color-primary)',
        secondaryVar: 'var(--color-secondary)',
        tertiaryVar: 'var(--color-tertiary)',
        blackVar: 'var(--color-black)',
      },
      boxShadow: {
        card: '0px 8px 24px 0px rgba(0,0,0,0.15);',
        dropdown: '0px 4px 12px 0px rgba(0,0,0,0.15);',
      },
      screens: {
        xs: '450px',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/herobg.png')",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['responsive', 'hover', 'focus', 'active'],
    },
  },
  plugins: [],
};
