import * as amplitude from '@amplitude/analytics-browser';
import { AMPLITUDE_SESSION_HEADER_KEY, ApiEndpoint, ApiError } from '@shared/types/common';
import { QueryKey, UseMutationOptions, useMutation } from '@tanstack/react-query';
import { ApiErrorResponse } from 'apisauce';
import { useSession } from 'next-auth/react';

import api from '#config/api';
import { ApiAuthOptions } from '#lib/types/hooks';

export function useHttpMutation<Endpoint extends ApiEndpoint>(
  key: QueryKey,
  route: Endpoint['route'],
  method: 'post' | 'put' | 'patch' | 'delete',
  extraHeaders: Record<string, string> = {},
  authOptions?: Partial<ApiAuthOptions>,
  options?: UseMutationOptions<Endpoint['response'], ApiErrorResponse<ApiError>, Endpoint['data']>
) {
  const { data: session, status } = useSession({
    required: false
  });

  const mutation = useMutation<Endpoint['response'], ApiErrorResponse<ApiError>, Endpoint['data']>({
    ...options,
    mutationKey: key,
    mutationFn: async data => {
      const result = await api[method]<Endpoint['response']>(route, data?.body, {
        headers: {
          'Content-Type': 'application/json',
          ...(authOptions?.authorized && {
            authorization: `Bearer ${session?.loginData.token}`
          }),
          ...(authOptions?.includeSessionId && {
            [AMPLITUDE_SESSION_HEADER_KEY]: amplitude.getSessionId()
          }),
          ...extraHeaders
        }
      });

      if (!result.ok || !result.data) {
        throw new Error(result.problem || 'Unknown error');
      }

      return result.data;
    }
  });

  return {
    ...mutation,
    isLogged: status === 'authenticated',
    isLoading: authOptions?.authorized ? status === 'loading' || mutation.isPending : mutation.isPending
  };
}
