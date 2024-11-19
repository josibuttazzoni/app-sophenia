import { FormLabel } from '#components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/ui/select';

type CustomSelectProps = {
  label?: string;
  items: string[];
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function CustomSelect({ label, items, placeholder, value, onChange }: CustomSelectProps) {
  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}
      <Select value={value} onValueChange={val => onChange?.(val)}>
        <SelectTrigger>
          <SelectValue placeholder={value ?? placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map(item => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
