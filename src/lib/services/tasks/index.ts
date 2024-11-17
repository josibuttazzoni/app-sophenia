import { GetTaskByIdResponse, Task } from 'src/types/tasks';

import api from '#config/api';

export const createTask = async (tasks: Task[]): Promise<Task[]> => {
  const response = await api.post<Task[]>('/tasks', { tasks });
  if (!response.data) {
    throw new Error('Failed to create task');
  }
  return response.data;
};

export const getTaskById = async (id: string) => api.get<GetTaskByIdResponse>(`/tasks/${id}`);

export const getTasksByIds = async (ids: string[]) => Promise.all(ids.map(id => getTaskById(id)));
