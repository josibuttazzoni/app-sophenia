import { DeleteUserRequestVariables, GetUserProfileResponse } from 'src/types/users';

import api from '#config/api';

export const getCurrentProfile = async () => {
  return api.get<GetUserProfileResponse>('/user/profile');
};

export const getUserByID = async (id: string) => api.get(`/user/${id}`);

export const deleteUser = async ({ id }: DeleteUserRequestVariables) => api.delete(`/user/${id}`);
