import { createQuery } from 'react-query-kit';
import { Backlog } from 'src/types/tasks';

import { getBacklog } from '#lib/services/tasks';

export const useBacklog = createQuery({
  queryKey: [`/tasks/backlog`],
  fetcher: (): Promise<Backlog[]> => getBacklog()
});
