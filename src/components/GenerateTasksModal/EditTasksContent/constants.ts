import { Input } from '#components/ui/input';
import { Switch } from '#components/ui/switch';
import { TextArea } from '#components/ui/textarea';

export const FIELDS = [
  {
    name: 'title',
    component: Input
  },
  {
    name: 'description',
    component: TextArea,
    isColumn: true
  },
  {
    name: 'requiresTaskReport',
    component: Switch
  },
  {
    name: 'estimatedHoursToComplete',
    component: Input,
    formatContent: (content: string) => `${content}hs`
  }
];
