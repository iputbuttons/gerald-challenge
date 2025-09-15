/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './features/**/components/*.{js,jsx,ts,tsx}',
    './shared/components/*.{js,jsx,ts,tsx}',
    './shared/providers/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'satoshi-bold': ['Satoshi-Bold'],
        'satoshi-medium': ['Satoshi-Medium'],
        'satoshi-regular': ['Satoshi-Regular']
      }
    }
  },
  plugins: []
}
