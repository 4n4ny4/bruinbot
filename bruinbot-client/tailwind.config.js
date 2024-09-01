/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to all of your components
  ],
  theme: {
    extend: {
      backgroundImage: {
        'black-gradient': "url('/Users/ananyaanand/Desktop/bruinbot/src/assets/banner-bg.png')"
      }
    },
  },
  plugins: [],
};