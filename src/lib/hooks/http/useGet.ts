import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ApiEndpoint, ApiError } from 'src/types';

import api from '#config/api';
import { ApiAuthOptions } from '#lib/types/hooks';

export function useGet<Endpoint extends ApiEndpoint>(
  key: QueryKey,
  route: Endpoint['route'],
  data: Endpoint['data'],
  queryOptions: Omit<UseQueryOptions<Endpoint['data'], ApiError, Endpoint['response'], QueryKey>, 'queryKey'>,
  authOptions?: Partial<ApiAuthOptions & { mustBeLogged: boolean }>
) {
  const extraHeaders = {};
  const { data: session, status } = useSession({
    required: authOptions?.mustBeLogged || false
  });

  const query = useQuery({
    ...queryOptions,
    queryKey: key,
    queryFn: async () => {
      const result = await api.get<Endpoint['response']>(route, data?.query, {
        headers: authOptions?.authorized
          ? {
              authorization: `Bearer ${session?.loginData.token}`
            }
          : extraHeaders
      });
      if (!result.ok) {
        throw new Error(result.problem);
      }
      return result.data;
    }
  });

  return {
    ...query,
    isLogged: status === 'authenticated',
    isLoading: authOptions?.authorized ? status === 'loading' || query.isLoading : query.isLoading
  };
}
