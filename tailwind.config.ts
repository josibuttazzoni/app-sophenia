import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        claret: '#811744',
        disco: '#821744',
        'ebony-clay': '#212B36',
        'oxford-blue': '#374151',
        'maroon-flush': '#A42259',
        'pale-sky': '#6B7280',
        prim: '#ECDDE3',
        mystic: '#DDE7EC',
        mischka: '#DADEE4',
        snuff: '#E1DDEC',
        logan: '#AA9FC6',
        'willow-grove': '#E3ECDD',
        'athens-gray': '#F4F5F7',
       'dark-red':'#b34747',
       'muted-red':'#c65a5a',
        'soft-coral':'#d96666',
        'light-coral':'#e68080',
        'pale-pink':'#f2a3a3',
        peach:'#ffd9b3',
        beige:'#f5e1a4',
        'darker-green':'#66a366',
        'forest-green':'#338033',
        'deep-green':'#006600',
        'deep-red':'#991f1f',
        'muted-crimson':'#b23a3a',
        'soft-coral-red':'#c15454',
        'warm-light-coral':'#d96d6d',
        'muted-dark-red':'#bf7474',
        'strong-peach':'#ffaa80',
        'beige-gold':'#d9c58c',
        'strong-dark-green':'#4d804d',
        'rich-forest-green':'#206020',
        'deep-dark-green':'#004d00',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
