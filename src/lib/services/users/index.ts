import {
  DeleteUserRequestVariables,
  GetUser,
  GetUserProfileResponse,
  UpdateUserRequestVariables
} from 'src/types/users';

import api from '#config/api';

export const getCurrentProfile = async () => {
  return api.get<GetUserProfileResponse>('/user/profile');
};

export const getUserByID = async (id: string) => api.get<GetUser>(`/user/${id}`);

export const deleteUser = async ({ id }: DeleteUserRequestVariables) => api.delete(`/user/${id}`);

export const updateUser = async ({ id, data }: { id: string; data: UpdateUserRequestVariables }) =>
  api.patch(`/user/${id}`, data);
