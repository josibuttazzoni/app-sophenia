import { Key } from 'react';

import { FormLabel } from '#components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/ui/select';
import { RoleDto } from '#lib/enums/employees';

type SelectData = string | RoleDto;

type Value<T extends SelectData> = {
  value: T;
  label: string;
};

type CustomSelectProps<T extends SelectData> = {
  label?: string;
  placeholder?: string;
  value?: Value<T>;
  defaultValue?: Value<T>;
  items: Value<T>[];
  className?: string;
  onChange?: (value: T) => void;
};

export default function CustomSelect<T extends SelectData>({
  label,
  items,
  placeholder,
  value,
  onChange,
  className,
  defaultValue
}: CustomSelectProps<T>) {
  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        defaultValue={defaultValue?.value}
        value={value?.value}
        onValueChange={val => onChange?.(val as T)}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={value?.label ?? placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item: Value<T>) => (
            <SelectItem key={item.value as Key} value={item.value as string}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
