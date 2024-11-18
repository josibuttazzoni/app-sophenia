import { createQuery } from 'react-query-kit';

import { getEmployees } from '#lib/services/employess';
import { Employee } from 'src/types/employee';

export const useEmployees = createQuery({
  queryKey: [`/user/workers`],
  fetcher: (): Promise<Employee[]> => getEmployees()
});
