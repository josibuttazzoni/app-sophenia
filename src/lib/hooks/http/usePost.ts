import { ApiEndpoint, ApiError } from '@shared/types/common';
import { QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { ApiErrorResponse } from 'apisauce';

import { ApiAuthOptions } from '#lib/types/hooks';

import { useHttpMutation } from '../query/useMutation';

export function usePost<Endpoint extends ApiEndpoint>(
  cacheKey: QueryKey,
  route: Endpoint['route'],
  headers?: Record<string, string>,
  authOptions?: Partial<ApiAuthOptions>,
  queryOptions?: UseMutationOptions<Endpoint['response'], ApiErrorResponse<ApiError>, Endpoint['data']>
) {
  return useHttpMutation(cacheKey, route, 'post', headers, authOptions, queryOptions);
}
