import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { Backlog, SuggestTasksVariables } from 'src/types/tasks';

import { suggestTasks } from '#lib/services/tasks';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useSuggestTasks = (setTasks: (tasks: Backlog[]) => void) => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: SuggestTasksVariables) => suggestTasks(variables).then(handleServerResponse),
    onSettled: response => {
      queryClient.invalidateQueries({ queryKey: ['tasks/suggest'] });
      if (response) setTasks(response);
    },
    ...mapQueryOptions(tCommon)
  })();
};
