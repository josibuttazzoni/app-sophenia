import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { AddRatingRequestVariables } from 'src/types/tasks';

import { addRating } from '#lib/services/tasks';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useRating = () => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: AddRatingRequestVariables) => addRating(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/tasks'] });
    },
    ...mapQueryOptions(tCommon)
  })();
};
