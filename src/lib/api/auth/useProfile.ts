import type { ApiResponse } from 'apisauce';
import { deleteCookie, hasCookie } from 'cookies-next';
import { createQuery } from 'react-query-kit';
import { GetUserProfileResponse } from 'src/types/users';

import { COOKIES } from '#constants/cookies';
import { useLoginRedirect } from '#lib/hooks/general/useLoginRedirect';
import { getCurrentProfile } from '#lib/services/users';

export const useProfile = () => {
  const loginRedirect = useLoginRedirect();
  const handleServerResponse = (response: ApiResponse<GetUserProfileResponse>) => {
    if (!response.ok) {
      if (hasCookie(COOKIES.AUTH_TOKEN)) {
        deleteCookie(COOKIES.AUTH_TOKEN);
      }
      loginRedirect();
    }
    return response.data;
  };
  return createQuery({
    queryKey: [`/user/profile`],
    fetcher: () => getCurrentProfile().then(handleServerResponse)
  })();
};
