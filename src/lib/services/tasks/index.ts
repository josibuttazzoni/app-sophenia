import { ApiResponse } from 'apisauce';
import {
  AddRatingRequestVariables,
  Backlog,
  GetBacklogResponse,
  GetTaskByIdResponse,
  SuggestTasksVariables,
  Task,
  UpdateTaskRequestVariables
} from 'src/types/tasks';

import api from '#config/api';
import { mapBacklog, mapTask } from '#lib/mappers/tasks';

export const createTasks = async (tasks: Backlog[]): Promise<ApiResponse<Task[]>> => {
  const response = await api.post<Task[]>('/tasks', { tasks });
  if (!response.data) {
    throw new Error('Failed to create task');
  }
  return { ...response };
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
    limit: 50,
    offset: 0
  });
  if (!response.data || !response.data.data) {
    throw new Error('Failed to fetch backlog');
  }
  return mapBacklog(response.data.data);
};

export const suggestTasks = async ({ objective, seasonMoment }: SuggestTasksVariables) => {
  return await api.post<Backlog[]>('tasks/suggest', { objective, seasonMoment });
};

export const addRating = async ({ id, rating, ratingComment }: AddRatingRequestVariables) =>
  api.patch<Task>(`/tasks/${id}/rate`, {
    rating,
    ratingComment
  });
