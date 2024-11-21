import { Control } from 'react-hook-form';
import { Backlog } from 'src/types/tasks';

import { FormControl, FormField, FormItem } from '#components/ui/form';
import { Switch } from '#components/ui/switch';

type SwitchFieldProps = {
  title: string;
  content: boolean;
  isEditing: boolean;
  name: `${number}.${keyof Backlog}`;
  control: Control<Backlog[], any>;
};

export default function SwitchField({ title, content, isEditing, name, control }: SwitchFieldProps) {
  console.log(content);
  return (
    <div className="flex w-full flex-row items-center gap-x-2 text-sm text-pale-sky">
      <div className="font-medium">{title}</div>
      <div className={isEditing ? 'block' : 'hidden'}>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <Switch
              defaultChecked={content}
              checked={!!field.value}
              onCheckedChange={checked => field.onChange(checked)}
            />
          )}
        />
      </div>
      <div className={isEditing ? 'hidden' : 'block'}>{content ? 'Si' : 'No'}</div>
    </div>
  );
}
