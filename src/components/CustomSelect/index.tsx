import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/ui/select';

type CustomSelectProps = {
  label: string;
  items: string[];
  placeholder: string;
  t: (key: string) => string;
};

export default function CustomSelect({ label, items, placeholder, t }: CustomSelectProps) {
  return (
    <Select>
      <span className="text-sm">{label}</span>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(item => (
          <SelectItem key={item} value={item}>
            {t(item)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
