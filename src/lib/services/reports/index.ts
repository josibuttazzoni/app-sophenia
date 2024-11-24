import api from '#config/api';

export const getReportByWorker = async (workerId: string) => {
  const response = await api.get(`/reports/worker/${workerId}`);
  return response.data;
};

export const getReportWorkOrder = async (dateFrom: Date, dateTo: Date) => {
  const response = await api.get(`/reports/work-order/?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  return response.data;
};
