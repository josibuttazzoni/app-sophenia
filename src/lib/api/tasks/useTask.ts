import { createQuery } from 'react-query-kit';
import { Task } from 'src/types/tasks';

import { getTaskById } from '#lib/services/tasks';

type Variables = { id: string };

export const useTask = createQuery({
  queryKey: [`/tasks/id`],
  fetcher: (variables: Variables): Promise<Task> => getTaskById(variables.id)
});
