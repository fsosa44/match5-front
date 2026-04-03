/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#002f23",
        secondary: "#005138",
        input: "#004130",
        accent: {
          DEFAULT: "#7ac34a",
          light: "#97e86a",
        },
        "text-light": "#e6f1dc",
        alternate: "#57a66f",
        "button-text": "#002f23",
        inactive: "#6a9486",
      },
    },
  },
  plugins: [],
}