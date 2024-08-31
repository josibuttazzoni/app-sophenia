import * as React from 'react';
import { cn } from 'src/utils/components';

import { Label } from './label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, ...props }, ref) => {
  return (
    <div className="text-sm flex w-full flex-col gap-y-1">
      {label}
      <input
        type={type}
        className={cn(
          'rounded-md border-slate-200 text-sm file:text-sm placeholder:text-slate-500 focus-visible:ring-disco dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 flex h-10 w-full border bg-white px-3 py-2 ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
