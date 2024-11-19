import {
  LoginRequestVariables,
  LoginResponse,
  RegisterRequestVariables,
  RegisterResponse
} from 'src/types/auth';

import api from '#config/api';

export const login = async ({ email, password, role }: LoginRequestVariables) => {
  return api.post<LoginResponse>('/auth/login', {
    email: email,
    password: password,
    role: role
  });
};

export const register = async ({ email, fullname, role }: RegisterRequestVariables) => {
  return api.post<RegisterResponse>('/auth/register', {
    email,
    fullname,
    role,
    status: 'active'
  });
};
