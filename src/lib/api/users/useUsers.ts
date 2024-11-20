import { createQuery } from 'react-query-kit';
import { User } from 'src/types/users';

import { getUsers } from '#lib/services/users';

export const useUsers = createQuery({
  queryKey: [`/user`],
  fetcher: (): Promise<User[]> => getUsers()
});
