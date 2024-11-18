import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { UpdateUserRequestVariables } from 'src/types/users';

import { updateUser } from '#lib/services/users';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useUpdateUser = () => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: { id: string; data: UpdateUserRequestVariables }) =>
      updateUser(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/tasks'] });
    },
    ...mapQueryOptions(tCommon)
  })();
};
