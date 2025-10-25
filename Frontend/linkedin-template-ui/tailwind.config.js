/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          blue: '#0077B5',
          'blue-dark': '#005885',
          'blue-light': '#E1F5FE',
          gray: '#F3F2EF',
          'gray-dark': '#666666',
          'gray-light': '#F8F9FA'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
