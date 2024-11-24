import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { AddRatingRequestVariables } from 'src/types/tasks';

import { addRating } from '#lib/services/tasks';
import { getCurrentWorkOrder } from '#lib/services/workOrders';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useRating = (onSubmit: VoidFunction) => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: AddRatingRequestVariables) => addRating(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/board'] });
      getCurrentWorkOrder();
      onSubmit();
    },
    ...mapQueryOptions(tCommon)
  })();
};
