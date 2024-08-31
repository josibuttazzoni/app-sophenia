import { cva } from 'class-variance-authority';

export const taglineVariants = cva('flex items-center text-xs gap-x-2', {
  variants: {
    variant: {
      white: 'flex-row-reverse text-white',
      dark: 'text-pale-sky'
    }
  },
  defaultVariants: {
    variant: 'white'
  }
});
