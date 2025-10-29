/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bi-blue': '#0078D4',
        'bi-blue-dark': '#106EBE',
        'bi-blue-light': '#50A0E8',
        'bi-green': '#107C10',
        'bi-orange': '#FF8C00',
        'bi-red': '#D13438',
        'bi-purple': '#8764B8',
        'bi-teal': '#00B7C3',
        'bi-bg': '#F3F2F1',
        'bi-bg-secondary': '#FAFAFA',
        'bi-text': '#323130',
        'bi-text-secondary': '#605E5C',
        'bi-border': '#EDEBE9',
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
