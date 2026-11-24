import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: '#E4160A', deep: '#9E0E06', cream: '#FFF3DC', sun: '#FFC72C', ink: '#2B0805' },
      fontFamily: { display: ['var(--font-display)', 'serif'], sans: ['var(--font-body)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
