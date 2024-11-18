/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 1s ease-in-out', 
      },
    },
  },
  plugins: [],
};