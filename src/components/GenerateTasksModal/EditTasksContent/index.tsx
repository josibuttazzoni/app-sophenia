import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import EditIcon from '#assets/edit.svg';
import TickIcon from '#assets/tick.svg';
import DeleteIcon from '#assets/trash.svg';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import { TASKS_MOCK } from './mocks';

export default function EditTasksContent() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const [editing, setEditing] = useState(false);

  const taskRow = (title: string, content: string) => (
    <div className="flex w-full flex-row items-center gap-x-2 text-sm text-pale-sky">
      <div className="font-medium">{title}</div>
      {editing ? <Input className="h-7 w-fit" containerClassName="w-fit" value={content} /> : content}
    </div>
  );

  const titles = [t('description'), t('estimatedTime'), t('requiresDetail')];

  return (
    <div className="border-mischka flex max-h-96 flex-col gap-y-3 overflow-auto rounded-md border p-4">
      {TASKS_MOCK.map(({ title, description, id, estimatedHours, requiresTaskReport }) => (
        <div key={id} className="flex w-full flex-row items-center justify-between">
          <div className="flex w-full flex-col gap-y-1">
            <div className="font-semibold">{title}</div>
            {[description, `${estimatedHours}hs`, t(requiresTaskReport ? 'yes' : 'no')].map(
              (content, index) => taskRow(titles[index], content)
            )}
          </div>
          <div className="flex gap-x-2">
            {editing ? (
              <TickIcon onClick={() => setEditing(false)} className="cursor-pointer" />
            ) : (
              <EditIcon onClick={() => setEditing(true)} className="cursor-pointer" />
            )}
            {!editing && <DeleteIcon className="cursor-pointer" />}
          </div>
        </div>
      ))}
    </div>
  );
}
