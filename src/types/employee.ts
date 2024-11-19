import { Roles } from '../lib/enums/employees';

export interface Employee extends EmployeeDto {
  id: string;
  role: string;
}
export interface GetEmployeeResponse extends EmployeeDto {
  _id: string;
  roles: string[];
}

interface EmployeeDto {
  fullname: string;
  availability: boolean;
  wineRole: Roles;
  email: string;
}
