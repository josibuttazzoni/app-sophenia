import { Backlog } from 'src/types/tasks';
import type { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TasksState = {
  suggestedTasks: Backlog[] | [];
  setSuggestedTasks: (tasks: Backlog[] | []) => void;
};

export function tasksStateCreator(name = 'tasks') {
  return devtools(
    set => ({
      suggestedTasks: [],
      setSuggestedTasks: tasks => set({ suggestedTasks: tasks })
    }),
    { name }
  ) as StateCreator<TasksState>; // This hacks Typescript into thinking this is a normal state creator instead of the devtools middleware
}
