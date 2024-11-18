import { GetEmployeeResponse } from 'src/types/employee';

export const mapEmployees = (employees: GetEmployeeResponse[]) => {
  return employees.map(({ _id, ...employee }: GetEmployeeResponse) => ({
    id: _id,
    ...employee
  }));
};
