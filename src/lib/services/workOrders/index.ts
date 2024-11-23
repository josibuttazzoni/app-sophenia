import { GetWorkOrderResponse, GetWorkOrdersResponse } from 'src/types/workOrders';

import api from '#config/api';

export const getWorkOrders = async () =>
  api.get<{ data: GetWorkOrdersResponse[] }>('/work-orders', {
    limit: 50,
    offset: 0
  });

export const getCurrentWorkOrder = async () => api.get<GetWorkOrderResponse>('/work-orders/current');
