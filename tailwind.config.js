// tailwind.config.js
import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@heroui/theme/dist/components/(button|checkbox|form|input|scroll-shadow|ripple|spinner).js'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [heroui()]
}
