import { useCounterContext } from '#lib/providers/CounterContext';

export function CounterDisplay() {
  const count = useCounterContext(({ count }) => count);
  return (
    <p className="w-full text-center">
      The count is:{' '}
      <span className="text-lg font-semibold text-portage">
        <span key={count}>{count}</span>
      </span>
    </p>
  );
}
