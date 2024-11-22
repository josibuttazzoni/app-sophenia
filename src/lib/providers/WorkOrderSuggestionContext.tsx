import { ReactNode, useContext } from 'react';
import { createContext, useRef } from 'react';
import { useStore } from 'zustand';

import { type WorkOrderState, createWorkOrderSuggestionStore } from '#lib/stores/workOrders';

type WorkOrderSuggestionStoreContext = ReturnType<typeof createWorkOrderSuggestionStore>;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const WorkOrderSuggestionContext = createContext<WorkOrderSuggestionStoreContext>(null!);

export function WorkOrderSuggestionProvider({ children }: { children: ReactNode | undefined }) {
  const storeRef = useRef<WorkOrderSuggestionStoreContext>(createWorkOrderSuggestionStore());
  return (
    <WorkOrderSuggestionContext.Provider value={storeRef.current}>
      {children}
    </WorkOrderSuggestionContext.Provider>
  );
}

export function useWorkOrderSuggestionContext<T>(selector: (state: WorkOrderState) => T) {
  const store = useContext(WorkOrderSuggestionContext);
  if (!store) throw new Error('Missing WorkOrderSuggestionProvider.Provider in the tree');
  return useStore(store, selector);
}
