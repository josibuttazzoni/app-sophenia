import { ApiHealth } from 'src/types';

import api from '#config/api';

export const getHealth = async () => api.get<ApiHealth>('/health');
