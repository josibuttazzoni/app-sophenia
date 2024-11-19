import { GetEmployeeResponse } from 'src/types/employee';

export const mapEmployees = (employees: GetEmployeeResponse[]) => {
  return employees.map(({ _id, fullname, availability, email, roles }: GetEmployeeResponse) => ({
    id: _id,
    fullname: fullname,
    availability: availability,
    email: email,
    role: roles[0]
  }));
};
