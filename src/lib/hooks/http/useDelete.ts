import { QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { ApiErrorResponse } from 'apisauce';
import { ApiEndpoint, ApiError } from 'src/types';

import { ApiAuthOptions } from '#lib/types/hooks';

import { useHttpMutation } from '../query/useMutation';

export function useDelete<Endpoint extends ApiEndpoint>(
  cacheKey: QueryKey,
  route: Endpoint['route'],
  headers?: Record<string, string>,
  authOptions?: Partial<ApiAuthOptions>,
  queryOptions?: UseMutationOptions<Endpoint['response'], ApiErrorResponse<ApiError>, Endpoint['data']>
) {
  return useHttpMutation(cacheKey, route, 'delete', headers, authOptions, queryOptions);
}
