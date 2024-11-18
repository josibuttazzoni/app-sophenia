import { Roles } from '../lib/enums/employee';

export interface Employee extends EmployeeDto {
  id: string;
}
export interface GetEmployeeResponse extends EmployeeDto {
  _id: string;
}

interface EmployeeDto {
  fullname: string;
  isAvailable: boolean;
  wineRole: Roles;
  email: string;
}
