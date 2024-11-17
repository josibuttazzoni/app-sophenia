import * as React from 'react';
import { cn } from 'src/utils/components';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
  textarea?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, containerClassName, textarea, ...props }, ref) => {
    return (
      <div className={cn('flex w-full flex-col gap-y-1 text-sm', containerClassName)}>
        {label && <label>{label}</label>}
        <textarea
          ref={ref}
          className={cn(
            'flex h-full w-full flex-col rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
