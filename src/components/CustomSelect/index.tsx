import { FormLabel } from '#components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/ui/select';

type CustomSelectProps = {
  label?: string;
  items: { label: string; value: string }[];
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function CustomSelect({
  label,
  items,
  placeholder,
  value,
  onChange,
  className
}: CustomSelectProps) {
  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}
      <Select value={value} onValueChange={val => onChange?.(val)}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={value ?? placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
