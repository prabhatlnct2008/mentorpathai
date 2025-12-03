/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        'chat-bg': '#0B1020',
        primary: '#4C6FFF',
        'primary-hover': '#3D5FE0',
        secondary: '#7C3AED',
        'text-main': '#F9FAFB',
        'text-muted': '#9CA3AF',
        border: '#1F2937',
        success: '#10B981',
        error: '#EF4444',
        'bubble-bg': '#111827',
        'bubble-border': 'rgba(148, 163, 184, 0.25)',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'bubble': '18px',
        'card': '24px',
      },
      boxShadow: {
        'chat': '0 30px 80px rgba(15, 23, 42, 0.9)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-dot': 'bounceDot 1.4s infinite ease-in-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceDot: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
