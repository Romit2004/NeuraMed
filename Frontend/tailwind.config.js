/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '-15px 17px 17px rgba(10,10,10,0.25)'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}