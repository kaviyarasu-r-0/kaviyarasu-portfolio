/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        display: ['var(--font-syne)', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#080810',
          secondary: '#0d0d1a',
          card: '#10101f',
          glass: 'rgba(255,255,255,0.04)',
        },
        accent: {
          cyan: '#00f5ff',
          violet: '#7c3aed',
          pink: '#f472b6',
          lime: '#a3e635',
        },
        border: {
          subtle: 'rgba(255,255,255,0.08)',
          glow: 'rgba(0,245,255,0.3)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,245,255,0.15), transparent)',
        'card-glow': 'radial-gradient(ellipse at top, rgba(124,58,237,0.1), transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(0,245,255,0.2)',
        'glow-violet': '0 0 30px rgba(124,58,237,0.3)',
        'card': '0 4px 32px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
