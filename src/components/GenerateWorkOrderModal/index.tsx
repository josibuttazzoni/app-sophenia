import { useState } from 'react';
import { Task } from 'src/types/tasks';
import { User } from 'src/types/users';

import { WorkOrderSuggestionProvider } from '#lib/providers/WorkOrderSuggestionContext';

import { EditWorkOrderSuggestion } from './EditWorkOrderSuggestion';
import GenerateWorkOrderContent from './GenerateWorkOrderContent';

export const GenerateWorkOrderModal = ({ tasks, workers }: { tasks: Task[]; workers: User[] }) => {
  const [suggestionsDone, setSuggestionsDone] = useState(false);
  const [availableWorkers, setAvailableWorkers] = useState<User[]>([]);

  return (
    <WorkOrderSuggestionProvider>
      {suggestionsDone ? (
        <EditWorkOrderSuggestion workers={availableWorkers} />
      ) : (
        <GenerateWorkOrderContent
          tasks={tasks}
          workers={workers}
          setSuggestionsDone={setSuggestionsDone}
          setAvailableWorkers={setAvailableWorkers}
        />
      )}
    </WorkOrderSuggestionProvider>
  );
};
