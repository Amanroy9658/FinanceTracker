/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: '#0A0A0A',
        darkCard: '#1D1B1B',
        textMain: '#FAFAFA',
        textMuted: '#A3A3A3',
        brandAccent: '#69CDB9'
      }
    },
  },
  plugins: [],
}
