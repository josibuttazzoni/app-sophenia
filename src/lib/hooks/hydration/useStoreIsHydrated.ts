import { useEffect, useState } from 'react';

import { createHydratableStore } from '#lib/stores/createHydratableStore';

// https://docs.pmnd.rs/zustand/integrations/persisting-store-data#faq
export function useStoreIsHydrated<T extends object>(store: ReturnType<typeof createHydratableStore<T>>) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    // const unsubHydrate = store.persist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = store.persist.onFinishHydration(() => setHydrated(true));

    setHydrated(store.persist.hasHydrated());

    return () => {
      // unsubHydrate();
      unsubFinishHydration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hydrated;
}
