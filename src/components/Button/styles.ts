import { cva } from 'class-variance-authority';

export const buttonVariants = cva('flex justify-center rounded-md px-3 py-2 md:px-7 md:py-3', {
  variants: {
    variant: {
      primary: 'bg-disco text-white hover:bg-k-u-crimson',
      secondary: 'bg-white text-disco hover:border hover:border-disco'
    },
    status: {
      enabled: 'cursor-pointer focus:will-change-transform active:scale-95',
      disabled: 'cursor-not-allowed !bg-athens-gray text-pale-sky hover:bg-athens-gray',
      loading: 'cursor-wait'
    }
  },
  defaultVariants: {
    variant: 'primary',
    status: 'enabled'
  }
});
