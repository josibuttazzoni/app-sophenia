import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { Backlog } from 'src/types/tasks';

import { createTasks } from '#lib/services/tasks';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useCreateTasks = () => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (tasks: Backlog[]) => createTasks(tasks).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks/suggest'] });
    },
    ...mapQueryOptions(tCommon)
  })();
};
