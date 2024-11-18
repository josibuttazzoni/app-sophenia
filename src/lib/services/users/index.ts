import { DeleteUserRequestVariables } from 'src/types/users';

import api from '#config/api';

export const getUserByID = async (id: string) => api.get(`/user/${id}`);

export const deleteUser = async ({ id }: DeleteUserRequestVariables) => api.delete(`/user/${id}`);
