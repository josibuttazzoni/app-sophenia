import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { createWorkOrder } from '#lib/services/workOrders';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useCreateWorkOrder = (onSuccess: VoidFunction) => {
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { t: tBoard } = useTranslation(TRANSLATIONS_NAMESPACES.BOARD);
  return createMutation({
    mutationFn: (assignedTasks: {
      workOrderTasks: { taskId: string; workerAssignedId: string }[];
      name: string;
    }) => createWorkOrder(assignedTasks).then(handleServerResponse),
    ...mapQueryOptions(tCommon, tBoard('createWorkOrderError')),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/board', '/work-orders'] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/board', '/work-orders'] });
      onSuccess();
    }
  })();
};
