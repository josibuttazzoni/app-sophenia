import { GetEmployeeResponse } from 'src/types/employee';

import api from '#config/api';
import { mapEmployees } from '#lib/mappers/employees';

export const getEmployees = async () => {
  const response = await api.get<GetEmployeeResponse[]>('/user/workers');
  const employees = response.data;
  if (!employees) {
    throw new Error('Failed to fetch employees');
  }
  return mapEmployees(employees);
};
