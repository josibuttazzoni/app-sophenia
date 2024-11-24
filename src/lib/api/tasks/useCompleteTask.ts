import { useRouter } from 'next/router';
import { createMutation } from 'react-query-kit';
import { CompleteTaskRequestVariables } from 'src/types/tasks';

import { ROUTES } from '#constants/routes';
import { completeTask } from '#lib/services/tasks';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useCompleteTask = () => {
  const router = useRouter();
  return createMutation({
    mutationFn: (variables: CompleteTaskRequestVariables) =>
      completeTask(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/task/complete'] });
      router.push(`${ROUTES.WORKER}${ROUTES.TASKS}`);
    }
  })();
};
