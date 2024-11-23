import { GetTaskByIdResponse, Task } from 'tasks';

export interface WorkOrder {
  id: string;
  startDate: string;
  endDate: string;
  name: string;
  tasks: Task[];
}

export interface GetWorkOrdersResponse {
  id: string;
  startDate: string;
  endDate: string;
  name: string;
  tasksIds: string[];
}

export interface GetWorkOrderResponse {
  _id: string;
  startDate: Date;
  endDate: Date;
  name: string;
  tasks: GetTaskByIdResponse[];
}

export interface SuggestWorkOrderVariables {
  taskIds: string[];
  workersIds: string[];
}
export type SuggestWorkOrderResponse = { taskId: string; workerId: string }[];
