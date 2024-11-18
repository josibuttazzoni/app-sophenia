import { GetEmployeeResponse } from 'src/types/employee';

export const mapEmployees = (employees: GetEmployeeResponse[]) => {
  return employees.map(({ _id, fullname, availability, wineRole, email }: GetEmployeeResponse) => ({
    id: _id,
    fullname: fullname,
    availability: availability,
    wineRole: wineRole,
    email: email
  }));
};
