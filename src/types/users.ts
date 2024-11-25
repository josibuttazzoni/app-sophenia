import { RoleDto } from '../lib/enums/employees';
import { ErrorApiResponse } from './api/errors';

export interface User extends UserDto {
  id: string;
  role: RoleDto;
}

export interface GetUser extends UserDto {
  _id: string;
  roles: RoleDto[];
}

export interface UserDto {
  availability: boolean;
  email: string;
  fullname: string;
}

export type GetUserProfileResponse = GetUser & ErrorApiResponse;

export interface DeleteUserRequestVariables {
  id: string;
}

export interface UpdateUserRequestVariables {
  fullname?: string;
  email?: string;
  role?: RoleDto;
  status?: string;
  availability?: boolean;
}

export interface GetWorker extends UserDto {
  _id: string;
  roles: RoleDto[];
}
