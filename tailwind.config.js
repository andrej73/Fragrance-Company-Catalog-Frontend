/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '425px',
        // => @media (min-width: 425px) { ... }
        '3xl': '1700px',
        // => @media (min-width: 1700px) { ... }
      },
    },
  },
  plugins: [],
}

