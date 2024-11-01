/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        itim: ['Itim', 'cursive'],
        futura: ['Futura', 'sans-serif'],
        shrikhand: ['Shrikhand', 'sans-serif'],
      }
    },
  },
  plugins: [require('daisyui'),],
}

