import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { UpdateTaskRequestVariables } from 'src/types/tasks';

import { updateTaskStatus } from '#lib/services/tasks';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useUpdateTask = () => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: UpdateTaskRequestVariables) =>
      updateTaskStatus(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/tasks'] });
    },
    ...mapQueryOptions(tCommon)
  })();
};
