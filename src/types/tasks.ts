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
    wineRole: string;
    roles: string[];
    status: string;
    _id: string;
  };
  rating: number;
}
