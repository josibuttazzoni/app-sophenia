import {
  DeleteUserRequestVariables,
  GetUser,
  GetUserProfileResponse,
  UpdateUserRequestVariables
} from 'src/types/users';

import api from '#config/api';
import { mapUsers } from '#lib/mappers/users';

export const getCurrentProfile = async () => {
  return api.get<GetUserProfileResponse>('/user/profile');
};

// TODO: fix, limit is always 10
export const getUsers = async () => {
  const response = await api.get<{ data: GetUser[] }>('/user', {
    params: { limit: 30, offset: 0 }
  });
  if (!response.data || !response.data.data) {
    throw new Error('Failed to fetch users');
  }
  return mapUsers(response.data.data);
};

export const getUserByID = async (id: string) => api.get<GetUser>(`/user/${id}`);

export const deleteUser = async ({ id }: DeleteUserRequestVariables) => api.delete(`/user/${id}`);

export const updateUser = async ({ id, data }: { id: string; data: UpdateUserRequestVariables }) =>
  api.patch(`/user/${id}`, data);
