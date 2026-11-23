/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0a0a0a',
          900: '#121212',
          850: '#181818',
          800: '#1e1e1e',
          700: '#2a2a2a',
          600: '#3a3a3a',
          500: '#555555',
        },
        fiery: {
          DEFAULT: '#FF5722',
          hover: '#F44336',
          dark: '#E64A19',
          light: '#FF8A65',
          glow: 'rgba(255, 87, 34, 0.35)',
        },
        gold: {
          DEFAULT: '#FFC107',
          hover: '#FFB300',
          light: '#FFE082',
          glow: 'rgba(255, 193, 7, 0.35)',
        },
        offwhite: '#F8F9FA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 87, 34, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(255, 193, 7, 0.35)',
        'card-hover': '0 20px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px -3px rgba(255, 87, 34, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
