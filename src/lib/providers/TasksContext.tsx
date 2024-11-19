// See https://docs.pmnd.rs/zustand/guides/initialize-state-with-props#common-patterns
import { ReactNode, useContext } from 'react';
import { createContext, useRef } from 'react';
import { useStore } from 'zustand';

import { type TasksState, createTasksStore } from '#lib/stores/tasks';

type TasksStoreContext = ReturnType<typeof createTasksStore>;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const TasksContext = createContext<TasksStoreContext>(null!);

export function TasksProvider({ children }: { children: ReactNode | undefined }) {
  const storeRef = useRef<TasksStoreContext>(createTasksStore());
  return <TasksContext.Provider value={storeRef.current}>{children}</TasksContext.Provider>;
}

export function useTasksContext<T>(selector: (state: TasksState) => T) {
  const store = useContext(TasksContext);
  if (!store) throw new Error('Missing TasksContext.Provider in the tree');
  return useStore(store, selector);
}
