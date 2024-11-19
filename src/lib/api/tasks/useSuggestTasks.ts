import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { SuggestTasksVariables, UpdateTaskRequestVariables } from 'src/types/tasks';

import { suggestTasks, updateTaskStatus } from '#lib/services/tasks';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useSuggestTasks = () => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: SuggestTasksVariables) => suggestTasks(variables).then(handleServerResponse),
    onSettled: response => {
      queryClient.invalidateQueries({ queryKey: ['tasks/suggest'] });
      console.log(response);
    },
    ...mapQueryOptions(tCommon)
  })();
};
