import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { DeleteUserRequestVariables } from 'src/types/auth';

import { queryClient } from '#lib/api';
import { deleteUser } from '#lib/services/auth';
import { mapQueryOptions } from '#utils/queries';

import { handleServerResponse } from '../handleServerResponse';

export const useDeleteUser = () => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: DeleteUserRequestVariables) => deleteUser(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/users'] });
    },
    ...mapQueryOptions(tCommon)
  })();
};
