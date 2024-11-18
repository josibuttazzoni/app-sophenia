import { DeleteUserRequestVariables, LoginRequestVariables, LoginResponse } from 'src/types/auth';

import api from '#config/api';

export const login = async ({ email, password, role }: LoginRequestVariables) => {
  return api.post<LoginResponse>('/auth/login', {
    email: email,
    password: password,
    role: role
  });
};

export const getUserByID = async (id: string) => api.get(`/user/${id}`);

export const deleteUser = async ({ id }: DeleteUserRequestVariables) => api.delete(`/user/${id}`);
