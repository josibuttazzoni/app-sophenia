import { createHydratableStore } from '../createHydratableStore';
import type { CounterState } from './counterStateCreator';
import { counterStateCreator } from './counterStateCreator';

export const useAsyncCounterStore = createHydratableStore<CounterState>(
  counterStateCreator(0, 'async-counter'),
  {
    name: 'async-counter-store'
  }
);
