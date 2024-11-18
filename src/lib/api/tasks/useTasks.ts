import { createQuery } from 'react-query-kit';
import { GetTaskByIdResponse, Task } from 'src/types/tasks';

import { getTasksByIds } from '#lib/services/tasks';
import { getWorkOrders } from '#lib/services/workOrders';

export const useTasks = createQuery({
  queryKey: ['/work-orders-tasks'],
  fetcher: async (): Promise<Task[]> => {
    const workOrders = await getWorkOrders();
    const taskIds = workOrders?.flatMap(workOrder => workOrder.tasksIds);

    if (!taskIds) return [];
    const tasks = await getTasksByIds(taskIds);

    return tasks;
  }
});
