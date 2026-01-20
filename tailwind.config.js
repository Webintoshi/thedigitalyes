/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#7B1113',
          light: '#FEF2F2',
          dark: '#691011',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C569',
          dark: '#B8942E',
        },
        background: {
          DEFAULT: '#EEE5DF',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'var(--font-playfair)', 'Georgia', 'serif'],
        script: ['var(--font-tangerine)', 'cursive'],
        corsiva: ['"Monotype Corsiva"', 'cursive'],
      },
    },
  },
  plugins: [],
}
