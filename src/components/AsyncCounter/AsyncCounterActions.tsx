import { useAsyncCounterStore } from '#lib/stores/counter/useAsyncCounterStore';

import { Button } from '../Button';

export function AsyncCounterActions() {
  const { decrement, increment, reset, setCount } = useAsyncCounterStore(
    ({ decrement, increment, reset, setCount }) => ({
      decrement,
      increment,
      reset,
      setCount
    })
  );

  return (
    <div className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-4">
      <Button className="w-26" onClick={() => decrement(5)}>
        -5
      </Button>
      <Button className="w-26" onClick={() => decrement()}>
        -1
      </Button>
      <Button className="w-26" onClick={() => reset()}>
        Reset
      </Button>
      <Button className="w-26" onClick={() => setCount(10)}>
        Set to 10
      </Button>
      <Button className="w-26" onClick={() => increment()}>
        +1
      </Button>
      <Button className="w-26" onClick={() => increment(5)}>
        +5
      </Button>
    </div>
  );
}
