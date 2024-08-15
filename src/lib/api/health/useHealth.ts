import { ApiHealthEndpoint } from 'src/types';

import { useGet } from '#lib/hooks/http/useGet';

export function useHealth() {
  return useGet<ApiHealthEndpoint>(['HEALTH'], '/health', {}, {});
}
