import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { Backlog, SuggestTasksVariables } from 'src/types/tasks';

import CrossIcon from '#assets/cross.svg';
import EditIcon from '#assets/edit.svg';
import Stars from '#assets/stars.svg';
import TickIcon from '#assets/tick.svg';
import DeleteIcon from '#assets/trash.svg';
import { Button } from '#components/ui/button';
import { Form } from '#components/ui/form';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useCreateTasks } from '#lib/api/tasks/useCreateTasks';
import { useTasksContext } from '#lib/providers/TasksContext';

import InputField from './InputField';
import SwitchField from './SwitchField';
import TextAreaField from './TextAreaField';

type EditTasksContentProps = {
  suggestForm: UseFormReturn<SuggestTasksVariables, any, undefined>;
  onSubmit: (data: SuggestTasksVariables) => void;
  setTasksModalOpen: (open: boolean) => void;
  suggestLoading: boolean;
};

export default function EditTasksContent({
  setTasksModalOpen,
  onSubmit,
  suggestForm,
  suggestLoading
}: EditTasksContentProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);

  const { suggestedTasks, setSuggestedTasks } = useTasksContext(({ suggestedTasks, setSuggestedTasks }) => ({
    suggestedTasks,
    setSuggestedTasks
  }));

  const [editing, setEditing] = useState(
    Object.keys(suggestedTasks).reduce(
      (obj, key) => {
        obj[key] = false;
        return obj;
      },
      {} as { [key: string]: boolean }
    )
  );

  const form = useForm({ defaultValues: suggestedTasks });

  const { control, handleSubmit, setValue } = form;

  const { mutate: createTasks, status } = useCreateTasks(() => setTasksModalOpen(false));

  const handleConfirm = (taskIndex: number) => {
    const values = form.getValues()[taskIndex];
    setSuggestedTasks(
      suggestedTasks.map((item, index) => {
        if (index === taskIndex) {
          const filteredValues = Object.entries(values).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== '') {
                acc[key as keyof Backlog] = value;
              }
              return acc;
            },
            {} as Partial<typeof item>
          );
          return { ...item, ...filteredValues };
        }
        return item;
      })
    );
    setEditing({ ...editing, [taskIndex]: false });
  };

  const onCreateSubmit = () => {
    createTasks(suggestedTasks);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-xl font-semibold">{t('editTasks')}</div>
      <Form {...form}>
        <form className="flex h-full flex-col justify-between" onSubmit={handleSubmit(onCreateSubmit)}>
          <div
            className={`flex max-h-[530px] flex-col gap-y-3 overflow-auto rounded-md border-mischka p-4 ${!suggestLoading && 'border'}`}
          >
            {!suggestLoading &&
              suggestedTasks.map(
                ({ title, description, estimatedHoursToComplete, requiresTaskReport }, taskIndex) => {
                  const isEditing = editing?.[taskIndex];
                  return (
                    <div key={title} className="flex w-full flex-row items-center justify-between gap-x-4">
                      <div className="flex w-full flex-col gap-y-1">
                        <div className="font-semibold">{title}</div>
                        <TextAreaField
                          name={`${taskIndex}.description`}
                          isEditing={isEditing}
                          title={t('description')}
                          content={description}
                          control={control}
                        />
                        <InputField
                          name={`${taskIndex}.estimatedHoursToComplete`}
                          title={t('estimatedTime')}
                          isEditing={isEditing}
                          content={estimatedHoursToComplete}
                          control={control}
                        />
                        <SwitchField
                          name={`${taskIndex}.requiresTaskReport`}
                          isEditing={isEditing}
                          setValue={setValue}
                          title={t('requiresDetail')}
                          content={requiresTaskReport}
                          control={control}
                        />
                      </div>
                      <div className="flex gap-x-2">
                        {isEditing ? (
                          <TickIcon onClick={() => handleConfirm(taskIndex)} className="cursor-pointer" />
                        ) : (
                          <EditIcon
                            onClick={() => setEditing({ ...editing, [taskIndex]: true })}
                            className="cursor-pointer"
                          />
                        )}
                        {isEditing ? (
                          <CrossIcon onClick={() => setEditing({ ...editing, [taskIndex]: false })} />
                        ) : (
                          <DeleteIcon
                            onClick={() =>
                              setSuggestedTasks(suggestedTasks.filter(task => task.title !== title))
                            }
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  );
                }
              )}
          </div>
          <div className="flex w-full justify-end gap-x-4">
            <Button
              variant="secondary"
              type="button"
              onClick={e => {
                e.preventDefault();
                onSubmit(suggestForm.getValues());
              }}
              status={suggestLoading ? 'pending' : 'enabled'}
              className="flex w-44 gap-x-2"
            >
              {t('regenerate')}
              <Stars className="[&>path]:stroke-disco" />
            </Button>
            <Button status={status === 'pending' ? 'pending' : 'enabled'} type="submit" className="px-12">
              {t('confirm')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
