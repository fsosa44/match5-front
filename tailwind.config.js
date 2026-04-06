/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        body: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },
      colors: {
        background: "#00120b",
        surface: "#00120b",
        "surface-dim": "#00120b",
        "surface-container-lowest": "#000000",
        "surface-container-low": "#001710",
        "surface-container": "#001e16",
        "surface-container-high": "#00251b",
        "surface-container-highest": "#002c21",
        "surface-bright": "#003326",
        "surface-variant": "#002c21",
        primary: {
          DEFAULT: "#affd7c",
          dim: "#a2ee6f",
          container: "#6bb23b",
        },
        "on-primary": "#2b6100",
        "on-primary-container": "#0e2900",
        "on-background": "#d0feeb",
        "on-surface": "#d0feeb",
        "on-surface-variant": "#89b4a3",
        secondary: "#a3f5b7",
        "secondary-container": "#006030",
        outline: "#547e6e",
        "outline-variant": "#264f42",
        error: "#ff7351",
        "surface-tint": "#affd7c",
        "inverse-surface": "#e7fff3",
        "inverse-primary": "#306c00",
        // Legacy aliases for existing components
        input: "#004130",
        accent: {
          DEFAULT: "#affd7c",
          light: "#a3f5b7",
          dark: "#6bb23b",
        },
        "text-light": "#d0feeb",
        alternate: "#89b4a3",
        "button-text": "#0e2900",
        inactive: "#547e6e",
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
  },
  plugins: [],
}