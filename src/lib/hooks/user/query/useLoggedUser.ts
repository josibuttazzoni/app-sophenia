import { ApiMeEndpoint } from 'src/types';

import { useGet } from '../../http/useGet';

export function useLoggedUser(redirectIfNotLogged = false) {
  return useGet<ApiMeEndpoint>(
    ['LOGGED_USER'],
    '/me',
    {},
    {
      refetchInterval: 10000
    },
    { authorized: true, mustBeLogged: redirectIfNotLogged }
  );
}
