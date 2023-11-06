/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate'), require('@corvu/tailwind')],
}