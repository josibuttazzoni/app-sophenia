import { createStore } from 'zustand';

import { CounterState, counterStateCreator } from './counterStateCreator';

export function createCounterStore(initialCount?: CounterState['count']) {
  return createStore(counterStateCreator(initialCount));
}
