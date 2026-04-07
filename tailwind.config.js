/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        darkBg: '#0A0A0A',
        darkCard: '#1D1B1B',
        textMain: '#FAFAFA',
        textMuted: '#A3A3A3',
        brandAccent: '#69CDB9'
      },
      fontFamily: {
        lexend: ["Lexend-Regular"],
        lexendBold: ["Lexend-Bold"],
        lexendMedium: ["Lexend-Medium"],
        poppins: ["Poppins-Regular"],
        poppinsBold: ["Poppins-Bold"],
        poppinsMedium: ["Poppins-Medium"],
      }
    },
  },
  plugins: [],
}
