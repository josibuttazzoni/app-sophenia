// https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
import { useEffect, useState } from 'react';

import { createHydratableStore } from '#lib/stores/createHydratableStore';

export function useHydratableStore<T extends object, PersistedState extends object, F>(
  store: ReturnType<typeof createHydratableStore<T, PersistedState>>,
  callback: (state: T) => F
) {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
}
