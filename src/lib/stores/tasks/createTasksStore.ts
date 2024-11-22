import { createStore } from 'zustand';

import { tasksStateCreator } from './tasksStateCreator';

export function createTasksStore() {
  return createStore(tasksStateCreator());
}
