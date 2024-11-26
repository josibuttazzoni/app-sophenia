import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { Backlog } from 'src/types/tasks';

import CrossIcon from '#assets/cross.svg';
import EditIcon from '#assets/edit.svg';
import Stars from '#assets/stars.svg';
import TickIcon from '#assets/tick.svg';
import DeleteIcon from '#assets/trash.svg';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useTasksContext } from '#lib/providers/TasksContext';

import InputField from './InputField';
import SwitchField from './SwitchField';
import TextAreaField from './TextAreaField';

type TaskProps = Backlog & {
  editing: {
    [key: string]: boolean;
  };
  setEditing: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  index: number;
  isEditing: boolean;
  setValue: UseFormSetValue<Backlog[]>;
  control: Control<Backlog[], any>;
  handleConfirm: (taskIndex: number) => void;
};

export default function Task({
  title,
  description,
  estimatedHoursToComplete,
  editing,
  index,
  isEditing,
  setValue,
  requiresTaskReport,
  control,
  handleConfirm,
  setEditing
}: TaskProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const { suggestedTasks, setSuggestedTasks } = useTasksContext(({ suggestedTasks, setSuggestedTasks }) => ({
    suggestedTasks,
    setSuggestedTasks
  }));
  return (
    <div key={title} className="flex w-full flex-row items-center justify-between gap-x-4 py-2">
      <div className="flex w-full flex-col gap-y-1">
        <InputField
          name={`${index}.title`}
          title={t('title')}
          isEditing={isEditing}
          content={title}
          control={control}
          inputClassName="w-full"
        />
        <TextAreaField
          name={`${index}.description`}
          isEditing={isEditing}
          title={t('description')}
          content={description}
          control={control}
        />
        <InputField
          name={`${index}.estimatedHoursToComplete`}
          title={t('estimatedTime')}
          isEditing={isEditing}
          content={estimatedHoursToComplete}
          control={control}
          formatContent={content => `${content}hs`}
        />
        <SwitchField
          name={`${index}.requiresTaskReport`}
          isEditing={isEditing}
          setValue={setValue}
          title={t('requiresDetail')}
          content={!!requiresTaskReport}
          control={control}
        />
      </div>
      <div className="flex gap-x-2">
        {isEditing ? (
          <TickIcon
            onClick={() => handleConfirm(index)}
            className="cursor-pointer [&>path]:fill-pale-sky [&>path]:hover:fill-disco"
          />
        ) : (
          <EditIcon
            onClick={() => setEditing({ ...editing, [index]: true })}
            className="cursor-pointer text-pale-sky hover:text-disco"
          />
        )}
        {isEditing ? (
          <CrossIcon
            className="cursor-pointer [&>path]:stroke-pale-sky [&>path]:hover:stroke-disco"
            onClick={() => setEditing({ ...editing, [index]: false })}
          />
        ) : (
          <DeleteIcon
            onClick={() =>
              setSuggestedTasks(suggestedTasks.filter(task => task.title !== title || !task.title))
            }
            className="cursor-pointer text-pale-sky hover:text-disco"
          />
        )}
      </div>
    </div>
  );
}
