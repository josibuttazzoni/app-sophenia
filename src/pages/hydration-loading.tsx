import { AsyncCounter } from '#components/AsyncCounter';
import { Header } from '#components/Layout/Header';
import { PageHead } from '#components/PageHead';
import { StatusIndicator } from '#components/StatusIndicator';
import { useStoreIsHydrated } from '#lib/hooks/hydration/useStoreIsHydrated';
import { useAsyncCounterStore } from '#lib/stores/counter';

export default function HydrationLoading() {
  const hydrated = useStoreIsHydrated(useAsyncCounterStore);
  return (
    <>
      <PageHead />
      <Header />
      <StatusIndicator />
      <p>While the store is loading, it will show the loading message.</p>
      {hydrated ? <AsyncCounter /> : <p className="text-neutral-3">Loading async counter store...</p>}
    </>
  );
}
