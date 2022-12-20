/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      white:'#fefefe',
      dark:'#11172a',
      darkRed:'#bc3a41',
      red:'#fa3637',
      darkGray:'#383e50',
      gray:'#616571',
      ligthGray:'#8d8d88',
    },
    extend: {
      animation:{
        'spin-fast':'spin 0.5s linear infinite'
      }
    },
  },
  plugins: [],
}
