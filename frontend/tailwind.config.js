/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFDF7',
          100: '#FFF9E6',
          200: '#FFF2CC',
          300: '#FFE699',
          400: '#FFD700',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#9A6F0A',
          800: '#7D5A08',
          900: '#614506',
        },
        secondary: {
          50: '#F8F9FA',
          100: '#F1F3F4',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        silver: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#C0C0C0',
          500: '#A8A8A8',
          600: '#8E8E93',
          700: '#6D6D70',
          800: '#48484A',
          900: '#2C2C2E',
        },
        gold: {
          50: '#FFFDF7',
          100: '#FFF9E6',
          200: '#FFF2CC',
          300: '#FFE699',
          400: '#FFD700',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#9A6F0A',
          800: '#7D5A08',
          900: '#614506',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};