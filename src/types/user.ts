import { ErrorApiResponse } from 'api/errors';

export interface User {
  availability: boolean;
  id: string;
  email: string;
  password: string;
  wineRole: string;
  roles: string[];
  fullname: string;
  status: string;
}

export type GetUserProfileResponse = User & ErrorApiResponse;
