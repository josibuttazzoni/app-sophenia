import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';

export function createHydratableStore<T extends object, PersistedState extends object = T>(
  creator: StateCreator<T>,
  options: PersistOptions<T, PersistedState>
) {
  return create<T>()(persist(creator, options));
}
