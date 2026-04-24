/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        // Neutral surface palette
        ink: {
          50: '#F7F7F8',
          100: '#EDEDEF',
          200: '#D9D9DE',
          300: '#B5B5BD',
          400: '#86868F',
          500: '#5B5B64',
          600: '#3C3C44',
          700: '#26262C',
          800: '#17171B',
          900: '#0B0B0E',
        },
        // Accent + secondary — resolved at runtime via CSS custom properties
        accent: {
          DEFAULT: 'var(--color-accent)',
          soft: 'var(--color-accent-soft)',
          deep: 'var(--color-accent-deep)',
          ring: 'rgba(var(--color-accent-rgb), 0.35)',
        },
        violet: {
          DEFAULT: 'var(--color-secondary)',
          soft: 'var(--color-secondary-soft)',
          deep: 'var(--color-secondary-deep)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        display: [
          '"Bricolage Grotesque"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      fontSize: {
        'hero-sm': ['clamp(2.5rem, 6vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        hero: ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2rem, 5vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(17,17,17,0.06)',
        'soft-dark': '0 1px 2px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.45)',
        ring: '0 0 0 1px rgba(var(--color-accent-rgb),0.35), 0 0 0 4px rgba(var(--color-accent-rgb),0.12)',
        'glow-accent': '0 0 0 1px rgba(var(--color-accent-rgb),0.2), 0 4px 32px rgba(var(--color-accent-rgb),0.22), 0 1px 2px rgba(0,0,0,0.08)',
        'glow-accent-dark': '0 0 0 1px rgba(var(--color-accent-rgb),0.3), 0 4px 40px rgba(var(--color-accent-rgb),0.35), 0 1px 2px rgba(0,0,0,0.5)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        shimmer: 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
