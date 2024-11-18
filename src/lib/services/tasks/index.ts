import { GetTaskByIdResponse, Task } from 'src/types/tasks';
import { map } from 'zod';

import api from '#config/api';
import { mapTask } from '#lib/mappers/tasks';

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

export const getTasksByIds = async (ids: string[]): Promise<Task[]> =>
  Promise.all(ids.map(id => getTaskById(id)));
