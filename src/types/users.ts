import { ErrorApiResponse } from 'api/errors';

import { RoleDto } from '../lib/enums/employees';

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

export type GetUserProfileResponse = User & ErrorApiResponse;

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