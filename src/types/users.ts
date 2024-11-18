import { ErrorApiResponse } from 'api/errors';

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
  wineRole: string;
  roles: string[];
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
  role?: string;
  status?: string;
  availability?: boolean;
}
