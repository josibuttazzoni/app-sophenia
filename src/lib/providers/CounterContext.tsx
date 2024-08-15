// See https://docs.pmnd.rs/zustand/guides/initialize-state-with-props#common-patterns
import { useContext } from 'react';
import { PropsWithChildren, createContext, useRef } from 'react';
import { useStore } from 'zustand';

import { type CounterState, createCounterStore } from '#lib/stores/counter';

type CounterStoreContext = ReturnType<typeof createCounterStore>;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const CounterContext = createContext<CounterStoreContext>(null!);

type CounterProviderProps = PropsWithChildren<Pick<CounterState, 'count'>>;

export function CounterProvider({ children, count }: CounterProviderProps) {
  const storeRef = useRef<CounterStoreContext>(createCounterStore(count));
  return <CounterContext.Provider value={storeRef.current}>{children}</CounterContext.Provider>;
}

export function useCounterContext<T>(selector: (state: CounterState) => T) {
  const store = useContext(CounterContext);
  if (!store) throw new Error('Missing CounterContext.Provider in the tree');
  return useStore(store, selector);
}
