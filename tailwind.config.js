/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'urbanist': ['Urbanist', 'sans-serif'],
        'pretendard': ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif'],
      },
      colors: {
        'fashion-black': '#000000',
        'fashion-white': '#FFFFFF',
        'fashion-gray': '#737373',
        'fashion-light-gray': '#868686',
        'fashion-border': '#D9D9D9',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
      }
    },
  },
  plugins: [],
}
