import { Control } from 'react-hook-form';
import { Backlog } from 'src/types/tasks';

import { FormControl, FormField, FormItem } from '#components/ui/form';
import { TextArea } from '#components/ui/textarea';

type TextAreaFieldProps = {
  title: string;
  content: string;
  isEditing: boolean;
  name: `${number}.${keyof Backlog}`;
  control: Control<Backlog[], any>;
};

export default function TextAreaField({ title, content, isEditing, name, control }: TextAreaFieldProps) {
  return (
    <div className="flex w-full flex-col gap-y-2 text-sm text-pale-sky">
      <div className="font-medium">{title}</div>
      <div className={isEditing ? 'block' : 'hidden'}>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextArea {...field} value={String((content || field.value) ?? '')} defaultValue={content} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className={isEditing ? 'hidden' : 'block'}>{content}</div>
    </div>
  );
}
