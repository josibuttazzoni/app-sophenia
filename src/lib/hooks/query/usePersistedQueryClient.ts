import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { useEffect, useState } from 'react';

import { queryClient as defaultQueryClient } from '#lib/api';

export const usePersistedQueryClient = (queryClient: QueryClient = defaultQueryClient) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (isClient) {
      const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage });
      persistQueryClient({
        queryClient,
        persister: localStoragePersister
      });
    }
  }, [isClient, queryClient]);
};
