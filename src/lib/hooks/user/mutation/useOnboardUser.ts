import { ApiOnboardEndpoint } from 'src/types';
import { useQueryClient } from '@tanstack/react-query';

import { usePost } from '#lib/hooks/http/usePost';

export function useOnboardUser() {
  const queryClient = useQueryClient();
  return usePost<ApiOnboardEndpoint>(
    ['ONBOARD_USER'],
    '/me/onboard',
    {},
    { authorized: true },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ['LOGGED_USER']
        })
    }
  );
}
