import { RoleDto } from '../lib/enums/employees';

export interface Employee extends EmployeeDto {
  id: string;
  role: RoleDto;
}
export interface GetEmployeeResponse extends EmployeeDto {
  _id: string;
  roles: RoleDto[];
}

interface EmployeeDto {
  fullname: string;
  availability: boolean;
  email: string;
}
