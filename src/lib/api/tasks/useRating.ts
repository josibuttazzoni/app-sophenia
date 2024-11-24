import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { AddRatingRequestVariables } from 'src/types/tasks';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { addRating } from '#lib/services/tasks';
import { getCurrentWorkOrder } from '#lib/services/workOrders';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useRating = (onSubmit: VoidFunction) => {
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { t: tTask } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  return createMutation({
    mutationFn: (variables: AddRatingRequestVariables) => addRating(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/board'] });
      getCurrentWorkOrder();
      onSubmit();
    },
    ...mapQueryOptions(tCommon, tTask('addRatingError'))
  })();
};
