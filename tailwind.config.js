/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Add Montserrat as the default sans-serif font
      },
      colors: {
        // Define the gradient colors for potential use if needed
        'gradient-start': '#1a2a6c',
        'gradient-mid': '#b21f1f',
        'gradient-end': '#fdbb2d',
        // Keep the button color
        'button-blue': '#007BFF',
        'button-blue-hover': '#0056b3',
      }
    },
  },
}