import { createQuery } from 'react-query-kit';
import { User } from 'src/types/users';

import { getWorkers } from '#lib/services/users';

export const useWorkers = createQuery({
  queryKey: [`/user/workers`],
  fetcher: (): Promise<User[]> => getWorkers()
});
