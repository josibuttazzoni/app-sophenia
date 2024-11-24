import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Backlog, SuggestTasksVariables } from 'src/types/tasks';

import { useSuggestTasks } from '#lib/api/tasks';
import { useTasksContext } from '#lib/providers/TasksContext';

import EditTasksContent from './EditTasksContent';
import GenerateTasksContent from './GenerateTasksContent';

export default function GenerateTasksModal({
  setTasksModalOpen
}: {
  setTasksModalOpen: (open: boolean) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    defaultValues: {
      objective: '',
      seasonMoment: ''
    } as SuggestTasksVariables
  });

  const { setSuggestedTasks } = useTasksContext(({ setSuggestedTasks }) => ({
    setSuggestedTasks
  }));

  const handleSuccess = (tasks: Backlog[]) => {
    setSuggestedTasks(tasks);
    setIsEditing(true);
  };

  const { mutate: suggestTasks, status } = useSuggestTasks(handleSuccess);

  const onSubmit = (data: SuggestTasksVariables) => {
    suggestTasks({ objective: data.objective, seasonMoment: data.seasonMoment });
  };

  const suggestLoading = status === 'pending';

  return isEditing ? (
    <EditTasksContent
      suggestLoading={suggestLoading}
      suggestForm={form}
      onSubmit={onSubmit}
      setTasksModalOpen={setTasksModalOpen}
    />
  ) : (
    <GenerateTasksContent suggestLoading={suggestLoading} form={form} onSubmit={onSubmit} />
  );
}
