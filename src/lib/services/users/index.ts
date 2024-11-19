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

export const getUsers = async () => {
  const response = await api.get<{ data: GetUser[] }>('/user', {
    limit: 50,
    offset: 0
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
