/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Custom primary color
        secondary: '#3B82F6', // Custom secondary color
        accent: '#FBBF24', // Accent color for buttons, links, etc.
        dark: '#111827', // Dark color for navbar or backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family for a professional look
      },
      spacing: {
        18: '4.5rem', // Custom spacing if needed for padding/margin
      },
    },
  },
  plugins: [],
}
