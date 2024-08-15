import type { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export type CounterState = {
  count: number;
  decrement: (value?: number) => void;
  increment: (value?: number) => void;
  reset: () => void;
  setCount: (count: number) => void;
};

export function counterStateCreator(initialCount = 0, name = 'counter') {
  return devtools(
    set => ({
      count: initialCount,
      decrement: value => set(state => ({ count: state.count - (value ?? 1) })),
      increment: value => set(state => ({ count: state.count + (value ?? 1) })),
      setCount: count => set({ count }),
      reset: () => set({ count: initialCount })
    }),
    { name }
  ) as StateCreator<CounterState>; // This hacks Typescript into thinking this is a normal state creator instead of the devtools middleware
}
