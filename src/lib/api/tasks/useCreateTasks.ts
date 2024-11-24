import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { Backlog, Task } from 'src/types/tasks';

import { createTasks, getBacklog } from '#lib/services/tasks';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useCreateTasks = (onSubmit: VoidFunction) => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (tasks: Backlog[]) => createTasks(tasks).then(handleServerResponse<Task[]>),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/tasks/backlog'] });
      getBacklog();
      onSubmit();
    },
    ...mapQueryOptions(tCommon)
  })();
};
