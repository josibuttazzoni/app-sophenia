import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { SuggestWorkOrderVariables } from 'src/types/workOrders';

import { getSuggestionsForWorkOrder } from '#lib/services/workOrders';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useSuggestWorkOrder = (
  setSuggestions: (suggestions: { taskId: string; workerId: string }[]) => void
) => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: SuggestWorkOrderVariables) =>
      getSuggestionsForWorkOrder(variables).then(handleServerResponse),
    onSettled: response => {
      queryClient.invalidateQueries({ queryKey: [`/work-orders/suggest`] });
      if (response) setSuggestions(response);
    },
    ...mapQueryOptions(tCommon)
  })();
};
