export interface Task extends GetTaskByIdResponse {}

export type TaskStatus = 'pending' | 'progress' | 'review' | 'completed';

export interface GetTasksRequestVariables {
  limit: number;
  offset: number;
}

export interface GetTasksResponse {
  data: Task[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface GetTaskByIdResponse {
  _id: string;
  data: {
    title: string;
    description: string;
    status: TaskStatus;
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
  };
}
