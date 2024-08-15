import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`rounded-sm bg-portage px-4 py-2 font-medium text-white transition hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-portage focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95${
        className ? ` ${className}` : ''
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
