export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#111235',
        'orange': '#F2994A',
        'light': '#8C9AAD',
        'dark': '#1C1F26',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        nexa: ['Nexa', 'sans-serif']
      },
    },
  },
  plugins: [],
}