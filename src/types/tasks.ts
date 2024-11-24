import { RoleDto } from '../lib/enums/employees';
import { TaskStatusDto } from '../lib/enums/tasks';

export interface Task extends TaskDto {
  id: string;
}
export interface GetTaskByIdResponse extends TaskDto {
  _id: string;
}
interface TaskDto {
  title: string;
  description: string;
  status: TaskStatusDto;
  requiresTaskReport: boolean;
  estimatedHoursToComplete: number;
  workerAssigned: {
    email: string;
    password: string;
    fullname: string;
    roles: RoleDto[];
    status: string;
    _id: string;
  };
  rating: number;
  ratingComment?: string;
  taskReport?: {
    photoUrl?: string;
    detail?: string;
  };
}

export interface UpdateTaskRequestVariables {
  id: string;
  status: TaskStatusDto;
}

export interface Backlog extends BacklogDto {
  id: string;
}

export interface GetBacklogResponse extends BacklogDto {
  _id: string;
}
interface BacklogDto {
  title: string;
  description: string;
  status: TaskStatusDto;
  requiresTaskReport: boolean;
  estimatedHoursToComplete: number;
}

export interface CompleteTaskVariables {
  photoUrl?: string;
  detail?: string;
}

export type TaskCompleteDto = TaskDto & CompleteTaskVariables;

export interface SuggestTasksVariables {
  objective: string;
  seasonMoment?: string;
}
export interface AddRatingRequestVariables {
  id: string;
  rating: number;
  ratingComment?: string;
}

export type CompleteTaskRequestVariables = CompleteTaskVariables & {
  id: string;
};
