import { LoginRequestVariables, LoginResponse } from 'src/types/auth';

import api from '#config/api';

export const login = async ({ email, password, role }: LoginRequestVariables) => {
  return api.post<LoginResponse>('/auth/login', {
    email: email,
    password: password,
    role: role
  });
};

export const getUserByID = async (id: string) => api.get(`/user/${id}`);
