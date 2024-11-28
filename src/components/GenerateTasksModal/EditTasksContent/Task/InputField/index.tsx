import { Control } from 'react-hook-form';
import { Backlog } from 'src/types/tasks';

import { FormField } from '#components/ui/form';
import { Input } from '#components/ui/input';

type InputFieldProps = {
  title: string;
  content: string | number;
  isEditing: boolean;
  name: `${number}.${keyof Backlog}`;
  control: Control<Backlog[], any>;
  formatContent?: (content: string | number) => string;
  className?: string;
  inputClassName?: string;
};

export default function InputField({
  title,
  content,
  isEditing,
  name,
  control,
  className,
  inputClassName,
  formatContent
}: InputFieldProps) {
  return (
    <div className={`flex w-full flex-row items-center gap-x-2  text-sm text-pale-sky ${className}`}>
      <div className="font-medium">{title}</div>
      <div className={`${isEditing ? 'block' : 'hidden'} ${inputClassName}`}>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <Input className="h-7" {...field} defaultValue={content} value={field.value?.toString()} />
          )}
        />
      </div>
      <div className={isEditing ? 'hidden' : 'block'}>{formatContent ? formatContent(content) : content}</div>
    </div>
  );
}
