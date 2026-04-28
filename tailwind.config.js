// FILE: tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emergency: '#e63946',
        surface: '#12121a',
        card: '#1a1a2e',
        accent: '#4cc9f0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        flash: 'flash 0.5s ease-in-out infinite',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        flash: {
          '0%, 100%': { backgroundColor: '#e63946' },
          '50%': { backgroundColor: '#0a0a0f' },
        },
      },
    },
  },
  plugins: [],
};
