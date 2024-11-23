import {
  GetWorkOrderResponse,
  GetWorkOrdersResponse,
  SuggestWorkOrderResponse,
  SuggestWorkOrderVariables
} from 'src/types/workOrders';

import api from '#config/api';

export const getWorkOrders = async () => {
  const response = await api.get<{ data: GetWorkOrdersResponse[] }>('/work-orders', {
    limit: 50,
    offset: 0
  });
  if (!response.data || !response.data.data) {
    throw new Error('Failed to fetch work orders');
  }
  return response.data.data;
};

export const getCurrentWorkOrder = async () => api.get<GetWorkOrderResponse>('/work-orders/current');

export const getSuggestionsForWorkOrder = async ({ taskIds, workersIds }: SuggestWorkOrderVariables) => {
  return api.post<SuggestWorkOrderResponse>('/work-orders/suggest', {
    taskIds: taskIds,
    workersIds: workersIds
  });
};

export const createWorkOrder = async (assignedTasks: {
  workOrderTasks: { taskId: string; workerAssignedId: string }[];
  name: string;
}) => {
  return api.post('/work-orders', assignedTasks);
};
