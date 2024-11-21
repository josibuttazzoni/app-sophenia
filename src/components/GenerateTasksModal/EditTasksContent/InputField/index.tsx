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
};

export default function InputField({ title, content, isEditing, name, control }: InputFieldProps) {
  return (
    <div className="flex w-full flex-row items-center gap-x-2  text-sm text-pale-sky">
      <div className="font-medium">{title}</div>
      <div className={isEditing ? 'block' : 'hidden'}>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              className="h-7 w-fit"
              containerClassName="w-fit"
              defaultValue={String((content || field.value) ?? '')}
              value={String(field.value ?? '')}
            />
          )}
        />
      </div>
      <div className={isEditing ? 'hidden' : 'block'}>{content}</div>
    </div>
  );
}
