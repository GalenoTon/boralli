module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9100',  // Laranja principal mais forte
          600: '#f57c00',   // Laranja escuro
          700: '#ef6c00',
          800: '#e65100',
          900: '#d84315',
        }
      }
    },
  },
  plugins: [],
}

