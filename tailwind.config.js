/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-500": "#6584db",
        "blue-600": "#3a120a !important",
      },
      spacing: {
        48: "12rem !important",
      },
    },
  },
  plugins: [],
};
