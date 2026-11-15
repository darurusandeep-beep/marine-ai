/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        duo: {
          green: "#58cc02",
          greenDark: "#46a302",
          blue: "#1cb0f6",
          blueDark: "#1899d6",
          orange: "#ff9600",
          orangeDark: "#e58600",
          red: "#ff4b4b",
          redDark: "#ea2b2b",
          yellow: "#ffc800",
          yellowDark: "#e5b400",
          purple: "#ce82ff",
          purpleDark: "#a855f7",
          gray: "#e5e5e5",
          grayDark: "#afafaf",
          bg: "#ffffff",
          cardBg: "#f7f7f7",
          text: "#4b4b4b"
        }
      },
      fontFamily: {
        sans: ['"Feather"', '"Nunito"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'duo': '0 4px 0 0 rgba(0, 0, 0, 0.2)',
        'duo-lg': '0 8px 0 0 rgba(0, 0, 0, 0.2)',
        'duo-sm': '0 2px 0 0 rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
