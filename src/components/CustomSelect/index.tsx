import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/ui/select';

type CustomSelectProps = {
  label: string;
  items: string[];
  placeholder: string;
  value?: string;
};

export default function CustomSelect({ label, items, placeholder, value }: CustomSelectProps) {
  return (
    <Select>
      <span className="text-sm">{label}</span>
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
  );
}
