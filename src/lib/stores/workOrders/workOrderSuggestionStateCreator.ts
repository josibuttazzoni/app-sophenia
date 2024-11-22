import { Task } from 'src/types/tasks';
import { User } from 'src/types/users';
import type { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export type WorkOrderState = {
  suggestions: { task: Task; worker: User }[] | [];
  setSuggestions: (suggestions: { task: Task; worker: User }[] | []) => void;
};

export function workOrderSuggestionStateCreator(name = 'workOrders') {
  return devtools(
    set => ({
      suggestions: [],
      setSuggestions: suggestions => set({ suggestions: suggestions })
    }),
    { name }
  ) as StateCreator<WorkOrderState>;
}
