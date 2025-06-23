/** @type {import('tailwindcss').Config} */
const nativewindPreset = require("nativewind/preset");

module.exports = {
  presets: [nativewindPreset], // ✅ Required for NativeWind
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1b2845',
        accent: '#f4b400',
        secondary: '#313D5D',
        light: '#f7f7f7',
      },
      fontFamily: {
        helvegen: ['Helvegen-Regular'],
        helvegenBold: ['Helvegen-Bold'],
      },
    },
  },
  plugins: [],
};
