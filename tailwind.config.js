/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'scale-up-center': {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        'scale-down-center': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.5)' },
        },
      },
      animation: {
        'scale-up-center':
          'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'scale-down-center':
          'scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
  plugins: [],
};
