import { createStore } from 'zustand';

import { workOrderSuggestionStateCreator } from './workOrderSuggestionStateCreator';

export function createWorkOrderSuggestionStore() {
  return createStore(workOrderSuggestionStateCreator());
}
