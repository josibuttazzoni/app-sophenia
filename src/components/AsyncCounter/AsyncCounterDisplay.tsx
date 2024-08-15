import { useHydratableStore } from '#lib/hooks/hydration/useHydratableStore';
import { useAsyncCounterStore } from '#lib/stores/counter/useAsyncCounterStore';

export function AsyncCounterDisplay() {
  const count = useHydratableStore(useAsyncCounterStore, ({ count }) => count);
  return (
    <p>
      The count is:{' '}
      <span className="text-lg font-semibold text-portage">
        <span key={count}>{count}</span>
      </span>
    </p>
  );
}
