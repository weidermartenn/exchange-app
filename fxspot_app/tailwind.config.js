/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#121212FF',
        'semiaccent': '#161616FF',
        'perfectgreen': '#012D1FFF',
        'perfectgray': '#1C1C1CFF',
      },
    },
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif']
    },
    
  },
  plugins: [],
}

