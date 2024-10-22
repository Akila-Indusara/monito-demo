/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SVN-Gilroy", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('assets/rect.svg')",
        "hero-pattern-mobile": "url('assets/rect_mobile.svg')",
        "banner1": "url('assets/banner1Rect.svg')",
        "banner1-mobile": "url('assets/banner1Rect_mobile.svg')",
        "banner2": "url('assets/banner2Rect.svg')",

      },
      screens: {
        '1.5Xxl': '1440px',
      },
    },
  },
  plugins: [],
}