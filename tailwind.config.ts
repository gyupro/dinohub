import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dino': {
          'primary': '#ea580c',
          'secondary': '#f59e0b', 
          'accent': '#eab308',
          'emerald': '#059669',
          'forest': '#166534',
          'stone': '#78716c',
          'amber': '#f59e0b',
          'rust': '#c2410c',
          'sage': '#84cc16'
        },
        'fossil': {
          'brown': '#92400e',
          'tan': '#d69e2e',
          'cream': '#fef3c7',
          'charcoal': '#374151',
          'slate': '#64748b'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        futura: ['Futura', 'Century Gothic', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif']
      },
      animation: {
        'dino-pulse': 'dino-pulse 2s ease-in-out infinite',
        'natural-text': 'natural-text 4s ease-in-out infinite',
        'floating': 'floating 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out'
      },
      keyframes: {
        'dino-pulse': {
          '0%, 100%': { transform: 'scale(1)', filter: 'hue-rotate(0deg)' },
          '25%': { transform: 'scale(1.05)', filter: 'hue-rotate(15deg)' },
          '50%': { transform: 'scale(1.1)', filter: 'hue-rotate(30deg)' },
          '75%': { transform: 'scale(1.05)', filter: 'hue-rotate(15deg)' }
        },
        'natural-text': {
          '0%': { color: '#ea580c' },
          '25%': { color: '#f59e0b' },
          '50%': { color: '#eab308' },
          '75%': { color: '#84cc16' },
          '100%': { color: '#ea580c' }
        },
        'floating': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(234, 88, 12, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(234, 88, 12, 0.8)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'scaleIn': {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' }
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(234, 88, 12, 0.6)',
        'primary': '0 0 30px rgba(234, 88, 12, 0.4)',
        'secondary': '0 0 30px rgba(5, 150, 105, 0.4)',
        'amber': '0 0 30px rgba(245, 158, 11, 0.4)',
        'emerald': '0 0 30px rgba(5, 150, 105, 0.4)',
        'intense': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'natural': '0 0 50px rgba(234, 88, 12, 0.3)'
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}
export default config 