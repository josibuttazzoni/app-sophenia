import { GetUserProfileResponse } from 'src/types/user';

import api from '#config/api';

export const getCurrentProfile = async () => {
  return api.get<GetUserProfileResponse>('/user/profile');
};
