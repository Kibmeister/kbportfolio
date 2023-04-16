/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#FDFDFD',
        secondary: '#A29D9D',
        tertiary: '#151030',
        'container-title': '#516AAE',
        'grey-100': '#514E4D',
        'grey-10': '#EBEBEB',
        'primary': '#FDFDFD',
        'lion-100': '#FF7F1A',
        'black-100': '#100d25',
        'black-200': '#090325',
        'white-100': '#ffffff',
      },
      boxShadow: {
        card: '0px 12px 205px -12px rgba(0,0,0,0.30);',
      },
      screens: {
        xs: '450px',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
