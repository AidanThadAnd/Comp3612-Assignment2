/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: { //Custom background colors
        'custom-gray-primary': '#1f2937', 
        'custom-f1-red': '#FF1E00', 
      },
    },
  },
  plugins: [],
};