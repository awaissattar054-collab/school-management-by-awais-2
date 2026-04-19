/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "white",
        primary: "#172B4D", // Navy Blue
        secondary: "#2DCE89", // Mint Green
        accent: "#fb6340", // Orange Accent
        navy: {
          DEFAULT: "#172B4D",
          light: "#213e6d",
          dark: "#0a192f",
        },
        mint: {
          DEFAULT: "#2DCE89",
          light: "#2dce8926", // 15% opacity
          dark: "#24a46d",
        },
        muted: "#f8fafc",
        border: "#e2e8f0",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}
