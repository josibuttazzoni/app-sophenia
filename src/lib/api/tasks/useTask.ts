import { createQuery } from 'react-query-kit';
import { GetTaskByIdResponse } from 'src/types/tasks';

import { getTaskById } from '#lib/services/tasks';

import { handleServerResponse } from '../handleServerResponse';

type Variables = { id: string };

export const useTask = createQuery({
  queryKey: [`/tasks`],
  fetcher: (variables: Variables): Promise<GetTaskByIdResponse | undefined> =>
    getTaskById(variables.id).then(handleServerResponse)
});
