/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:{
          1: '#003C43',
          2: '#135D66',
          3: '#77B0AA',
          4: '#E3FEF7',
          5: '#EEF7FF'
        },
        secondary:{
          1: '#4A148C',
          2: '#135D66',
          3: '#77B0AA',
          4: '#FFa3a6'
        },
        white: '#FFF'
      }
    },
  },
  plugins: [],
}

