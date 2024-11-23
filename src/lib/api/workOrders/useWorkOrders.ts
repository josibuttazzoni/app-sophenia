import { createQuery } from 'react-query-kit';
import { WorkOrder } from 'src/types/workOrders';

import { getTasksByIds } from '#lib/services/tasks';
import { getWorkOrders } from '#lib/services/workOrders';
import { formatDateES } from '#utils/date';

import { handleServerResponse } from '../handleServerResponse';

export const useWorkOrders = createQuery({
  queryKey: [`/work-orders`],
  fetcher: async (): Promise<WorkOrder[] | undefined> => {
    const response = await getWorkOrders().then(handleServerResponse);
    const mappedData = response?.data.map(async workOrder => {
      const tasks = await getTasksByIds(workOrder.tasksIds);
      const startDate = formatDateES(new Date(workOrder.startDate));
      const endDate = formatDateES(new Date(workOrder.endDate));
      return { ...workOrder, tasks, startDate, endDate };
    });

    return mappedData ? await Promise.all(mappedData) : undefined;
  }
});
