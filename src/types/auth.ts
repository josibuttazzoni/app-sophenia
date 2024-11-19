import { RoleDto } from '../lib/enums/employees';

export type LoginResponse = {
  access_token: string;
};

export type LoginRequestVariables = {
  email: string;
  password: string;
  role: RoleDto;
};

export interface RegisterRequestVariables {
  fullname: string;
  email: string;
  role: RoleDto;
  status: string;
}

export interface RegisterResponse {
  email: string;
  password: string;
  fullname: string;
  roles: RoleDto[];
  status: string;
  availability: boolean;
  _id: string;
}
