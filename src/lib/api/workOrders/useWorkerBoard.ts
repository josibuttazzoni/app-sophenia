import { createQuery } from 'react-query-kit';
import { Task } from 'src/types/tasks';

import { mapTasks } from '#lib/mappers/tasks';
import { getCurrentWorkOrderByWorker } from '#lib/services/workOrders';

type Variables = { id?: string };

export const useWorkerBoard = createQuery({
  queryKey: [`worker/board`],
  fetcher: async (variables: Variables): Promise<Task[] | []> => {
    if (!variables.id) return [];
    const response = await getCurrentWorkOrderByWorker({ workerId: variables.id });
    const workOrderId = response.data?._id;

    if (!workOrderId || !response.data?.tasks) return [];

    return mapTasks(response.data?.tasks);
  }
});
