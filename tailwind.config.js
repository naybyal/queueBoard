/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": "#0d1117",
        "columnBackgroundColor": "#f43f5e"
      }
    },
  },
  plugins: [],
}

