import { GetWorkOrdersResponse } from 'src/types/workOrders';

import api from '#config/api';

export const getWorkOrders = async () => {
  const response = await api.get<{ data: GetWorkOrdersResponse[] }>('/work-orders', {
    params: { limit: 10, offset: 0 }
  });
  if (!response.data || !response.data.data) {
    throw new Error('Failed to fetch work orders');
  }
  return response.data.data;
};
