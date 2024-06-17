/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"], // Ajusta la ruta según la estructura de tu proyecto
  theme: {
    extend: {
      colors: {
        'custom-orange': '#FFA500',
        'purple-custom': '#8a3ab9',
        'black-custom': '#000000',
      },
      filter: {
        'blur': 'blur(8px)',
      },
    },
  },
  variants: {
    extend: {
      filter: ['hover', 'focus'],
    },
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}
