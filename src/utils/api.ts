import api from '#config/api';
import { HEADERS } from '#constants/api';

export const setAuthHeader = (token: string) => {
  api.setHeader(HEADERS.AUTHORIZATION, `Bearer ${token}`);
};
