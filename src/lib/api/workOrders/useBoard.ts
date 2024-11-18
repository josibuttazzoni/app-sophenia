import { createQuery } from 'react-query-kit';
import { Task } from 'src/types/tasks';

import { mapTasks } from '#lib/mappers/tasks';
import { getCurrentWorkOrder } from '#lib/services/workOrders';

export const useBoard = createQuery({
  queryKey: [`/board`],
  fetcher: async (): Promise<Task[] | []> => {
    const response = await getCurrentWorkOrder();
    const workOrderId = response.data?._id;

    if (!workOrderId || !response.data?.tasks) return [];

    return mapTasks(response.data?.tasks);
  }
});
