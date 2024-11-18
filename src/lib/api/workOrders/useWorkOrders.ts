import { createQuery } from 'react-query-kit';
import { GetWorkOrdersResponse } from 'src/types/workOrders';

import { getWorkOrders } from '#lib/services/workOrders';

export const useWorkOrders = createQuery({
  queryKey: [`/work-orders`],
  fetcher: (): Promise<GetWorkOrdersResponse[]> => getWorkOrders()
});
