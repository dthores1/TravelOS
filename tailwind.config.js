
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cream: 'var(--bg-cream)',
        ink: 'var(--text-ink)',
        muted: 'var(--text-muted)',
        teal: {
          DEFAULT: 'var(--accent-teal)',
          light: 'var(--accent-teal-light)'
        },
        warm: 'var(--border-warm)',
        amber: {
          DEFAULT: 'var(--status-amber)',
          light: 'var(--status-amber-light)'
        },
        green: {
          DEFAULT: 'var(--status-green)'
        },
        red: {
          DEFAULT: 'var(--status-red)'
        },
        surface: 'var(--surface-white)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'floating': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
