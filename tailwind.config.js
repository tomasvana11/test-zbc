/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}" // pokud máš komponenty zde
  ],
  theme: {
    extend: {
      colors:{
        silverSage: '#97A7A5',
        goldenBrown: '#9D6219',
        raisinBlack: '#232323',
        silkBeige: '#E2DBD5',
        lightDivGrey: 'E9E9E9',
        cardGrey: '#363535',
        cardBeige: '#F6F4F2',
        darkDivGrey: '#494847',
        inputLight: '#EEE9E6',
        inputPlaceholder: '#747271',
      },
    },
  },
  plugins: [],
}
