import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Brand fonts. Loaded via <link> in index.html so no build step is needed.
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightish: '-0.02em',
      },
      colors: {
        // NeighborhoodWash brand palette.
        bg: '#FAFAF7',          // warm off-white page background
        ink: '#1A1F2E',         // deep charcoal body text
        slatey: '#5A6478',      // muted body text
        brand: {
          DEFAULT: '#1E3A5F',   // deep house-blue
          dark: '#152A47',
          light: '#2A4A75',
        },
        cta: {
          DEFAULT: '#F4B324',   // sharp citrus — CTA only
          dark: '#D89A12',
        },
        sage: '#7A9B7E',        // safe-for-plants soft accent
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [animate],
};
