/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/*.js",
    "./script.js",
    "./catalogue.js"
  ],
  // Safelist : classes utilisées dynamiquement en JS qui ne sont jamais
  // dans un fichier HTML statique (Tailwind ne peut pas les détecter).
  safelist: [
    'hidden', 'show', 'hide',
    'has-items', 'flash', 'open',
    'mobile-item'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
