import { GetEmployeeResponse } from 'src/types/employee';

export const mapEmployees = (employees: GetEmployeeResponse[]) => {
  return employees.map(({ _id, fullname, isAvailable, wineRole, email }: GetEmployeeResponse) => ({
    id: _id,
    fullname: fullname,
    isAvailable: isAvailable,
    wineRole: wineRole,
    email: email
  }));
};
