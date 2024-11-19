import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import EditIcon from '#assets/edit.svg';
import TickIcon from '#assets/tick.svg';
import DeleteIcon from '#assets/trash.svg';
import { Input } from '#components/ui/input';
import { TextArea } from '#components/ui/textarea';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useTasksContext } from '#lib/providers/TasksContext';

export default function EditTasksContent() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const [editing, setEditing] = useState({});

  const { suggestedTasks } = useTasksContext(({ suggestedTasks }) => ({
    suggestedTasks
  }));

  const taskRow = (taskIndex: number, title: string, content: string, isDescription: boolean) => (
    <div
      className={`flex w-full text-sm text-pale-sky ${isDescription ? 'flex-col gap-y-2' : 'flex-row  items-center gap-x-2'}`}
    >
      <div className="font-medium">{title}</div>
      {editing?.[taskIndex] ? (
        isDescription ? (
          <TextArea value={content} />
        ) : (
          <Input className="h-7 w-fit" containerClassName="w-fit" value={content} />
        )
      ) : (
        content
      )}
    </div>
  );

  const titles = [t('description'), t('estimatedTime'), t('requiresDetail')];

  console.log(editing);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-xl font-semibold">{t('editTasks')}</div>
      <div className="flex max-h-[500px] flex-col gap-y-3 overflow-auto rounded-md border border-mischka p-4">
        {suggestedTasks.map(
          ({ title, description, estimatedHoursToComplete, requiresTaskReport }, taskIndex) => (
            <div key={title} className="flex w-full flex-row items-center justify-between gap-x-4">
              <div className="flex w-full flex-col gap-y-1">
                <div className="font-semibold">{title}</div>
                {[description, `${estimatedHoursToComplete}hs`, t(requiresTaskReport ? 'yes' : 'no')].map(
                  (content, index) => taskRow(taskIndex, titles[index], content, index === 0)
                )}
              </div>
              <div className="flex gap-x-2">
                {editing?.[taskIndex] ? (
                  <TickIcon
                    onClick={() => setEditing({ ...editing, [taskIndex]: false })}
                    className="cursor-pointer"
                  />
                ) : (
                  <EditIcon
                    onClick={() => setEditing({ ...editing, [taskIndex]: true })}
                    className="cursor-pointer"
                  />
                )}
                {!editing && <DeleteIcon className="cursor-pointer" />}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
