import { GetTaskByIdResponse, Task } from 'tasks';

export interface WorkOrder {
  id: string;
  startDate: Date;
  endDate: Date;
  name: string;
  tasks: Task[];
}

export interface GetWorkOrdersResponse {
  id: string;
  tasksIds: string[];
  date: string;
}

export interface GetWorkOrderResponse {
  _id: string;
  startDate: Date;
  endDate: Date;
  name: string;
  tasks: GetTaskByIdResponse[];
}
