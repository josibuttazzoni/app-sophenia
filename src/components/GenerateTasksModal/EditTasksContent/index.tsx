import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { Backlog, SuggestTasksVariables } from 'src/types/tasks';

import Stars from '#assets/stars.svg';
import { Button } from '#components/ui/button';
import { Form } from '#components/ui/form';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useCreateTasks } from '#lib/api/tasks/useCreateTasks';
import { useTasksContext } from '#lib/providers/TasksContext';

import Task from './Task';

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
    console.log(suggestedTasks);
    createTasks(suggestedTasks.filter(task => !!task.title));
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-xl font-semibold">{t('editTasks')}</div>
      <Form {...form}>
        <form className="flex h-full flex-col justify-between" onSubmit={handleSubmit(onCreateSubmit)}>
          <div
            className={`flex max-h-[530px] flex-col gap-y-3 divide-y overflow-auto rounded-md border-mischka p-4 ${!suggestLoading && 'border'}`}
          >
            {!suggestLoading &&
              suggestedTasks.map((task, taskIndex) => {
                const isEditing = editing?.[taskIndex];
                return (
                  <Task
                    {...task}
                    isEditing={isEditing}
                    handleConfirm={handleConfirm}
                    setValue={setValue}
                    control={control}
                    index={taskIndex}
                    setEditing={setEditing}
                    editing={editing}
                  />
                );
              })}
            <div className="flex w-full justify-end pt-2">
              <Button
                variant="ghost"
                className="w-fit"
                onClick={e => {
                  e.preventDefault();
                  setSuggestedTasks([
                    ...suggestedTasks,
                    {
                      title: '',
                      description: '',
                      requiresTaskReport: false,
                      estimatedHoursToComplete: 0
                    }
                  ]);
                  setEditing({ ...editing, [suggestedTasks.length]: true });
                }}
              >
                + {t('addTask')}
              </Button>
            </div>
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
            <Button status={status === 'pending' ? 'pending' : 'enabled'} type="submit" className="w-44">
              {t('confirm')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
