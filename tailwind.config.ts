import type { Config } from 'tailwindcss';
import defaultColors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { ThemeConfig } from 'tailwindcss/types/config';

const colors = {
  current: defaultColors.current,
  transparent: defaultColors.transparent,
  black: defaultColors.black,
  white: defaultColors.white,
  'mountain-meadow': '#2EEDAE',
  flamingo: '#EF4444',
  neutral: {
    6: '#323131',
    5: '#424040',
    4: '#666464',
    3: '#898787',
    2: '#A7A5A5',
    1: '#CDCBCB',
    0.5: '#E9E7E7',
    DEFAULT: '#323131'
  },
  portage: {
    DEFAULT: '#936CF0'
  }
} satisfies ThemeConfig['colors'];

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
      fontFamily: {},
      backgroundImage: {
        'main-page-gradient': 'linear-gradient(110.97deg, #212130 0%,  #12121C 100%)'
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        46: '11.5rem',
        50: '12.5rem',
        92: '23rem',
        225: '56rem'
      },
      transitionProperty: {
        'with-height': `${defaultTheme.transitionProperty.DEFAULT}, height`
      }
    },
    boxShadow: {
      none: defaultTheme.boxShadow.none,
      sm: '1px 1px 3px rgba(0, 0, 0, 0.03), 0px 0px 4px rgba(0, 0, 0, 0.1)',
      md: '1px 1px 1px rgba(0, 0, 0, 0.05), 1px 2px 7px rgba(0, 0, 0, 0.18)',
      lg: '0px 3px 12px rgba(196, 196, 196)'
    },
    borderRadius: {
      none: defaultTheme.borderRadius.none,
      xs: '0.25rem',
      sm: '0.5rem',
      lg: '1.5rem',
      full: defaultTheme.borderRadius.full
    },
    colors,
    fontSize: {
      title: ['4.5rem', '4.8rem'],
      'heading-1': ['3.5rem', '4rem'],
      'heading-2': ['3rem', '3.5rem'],
      'heading-3': ['2.5rem', '2.74rem'],
      'heading-4': ['2rem', '2.5rem'],
      'body-xxl': ['1.5rem', '2.25rem'],
      'body-xl': ['1.25rem', '2rem'],
      'body-lg': ['1.125rem', '1.5rem'],
      'body-md': ['1rem', '1.5rem'],
      'body-sm': ['0.875rem', '1.25rem'],
      'body-xs': ['0.75rem', '1rem']
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
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
