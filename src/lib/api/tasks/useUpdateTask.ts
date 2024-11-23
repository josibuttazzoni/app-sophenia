import { createMutation } from 'react-query-kit';
import { UpdateTaskRequestVariables } from 'src/types/tasks';

import { updateTaskStatus } from '#lib/services/tasks';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useUpdateTask = () => {
  return createMutation({
    mutationFn: (variables: UpdateTaskRequestVariables) =>
      updateTaskStatus(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/tasks/status'] });
    }
  })();
};
