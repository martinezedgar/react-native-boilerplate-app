/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'open-regular': ['OpenSans-Regular'],
        'open-semi': ['OpenSans-SemiBold'],
        'open-bold': ['OpenSans-Bold'],
      },
    },
  },
  plugins: [],
};
