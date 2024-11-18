import { GetBacklogResponse, GetTaskByIdResponse, Task, UpdateTaskRequestVariables } from 'src/types/tasks';

import api from '#config/api';
import { mapBacklog, mapTask } from '#lib/mappers/tasks';

export const createTasks = async (tasks: Task[]): Promise<Task[]> => {
  const response = await api.post<Task[]>('/tasks', { tasks });
  if (!response.data) {
    throw new Error('Failed to create task');
  }
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await api.get<GetTaskByIdResponse>(`/tasks/${id}`);
  const task = response.data;
  if (!task) {
    throw new Error('Failed to fetch task');
  }
  return mapTask(task);
};

export const updateTaskStatus = async ({ id, status }: UpdateTaskRequestVariables) =>
  api.patch<Task>(`/tasks/${id}/status`, {
    status
  });

export const getBacklog = async () => {
  const response = await api.get<{ data: GetBacklogResponse[] }>('/tasks/backlog', {
    params: { limit: 10, offset: 0 }
  });
  if (!response.data || !response.data.data) {
    throw new Error('Failed to fetch backlog');
  }
  return mapBacklog(response.data.data);
};
