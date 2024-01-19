/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      blur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

