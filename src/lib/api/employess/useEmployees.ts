import { createQuery } from 'react-query-kit';
import { Employee } from 'src/types/employee';

import { getEmployees } from '#lib/services/employess';

export const useEmployees = createQuery({
  queryKey: [`/user/workers`],
  fetcher: (): Promise<Employee[]> => getEmployees()
});
