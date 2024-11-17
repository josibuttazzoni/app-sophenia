import { createQuery } from 'react-query-kit';

import { GetTaskByIdResponse } from 'src/types/tasks';
import { getWorkOrders } from '#lib/services/workOrders';
import { getTasksByIds } from '#lib/services/tasks';
import { handleServerResponse } from '../handleServerResponse';
import { ApiResponse } from 'apisauce';

export const useTasks = createQuery({
  queryKey: ['/work-orders-tasks'],
  fetcher: async (): Promise<ApiResponse<GetTaskByIdResponse, GetTaskByIdResponse>[]> => {
    const workOrders = await getWorkOrders();
    const taskIds = workOrders?.flatMap((workOrder) => workOrder.tasksIds);

    if(!taskIds) return [];
    const tasks = await getTasksByIds(taskIds);

    return tasks;
  },
});
