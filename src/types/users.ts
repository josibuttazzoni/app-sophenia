import { ErrorApiResponse } from 'api/errors';

import { RoleDto } from '../lib/enums/employees';

export interface User extends UserDto {
  id: string;
}

export interface GetUser extends UserDto {
  _id: string;
}

export interface UserDto {
  availability: boolean;
  email: string;
  password: string;
  roles: RoleDto[];
  fullname: string;
  status: string;
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
