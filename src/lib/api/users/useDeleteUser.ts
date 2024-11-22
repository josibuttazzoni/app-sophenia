import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { DeleteUserRequestVariables } from 'src/types/users';

import { queryClient } from '#lib/api';
import { deleteUser, getUsers } from '#lib/services/users';
import { mapQueryOptions } from '#utils/queries';

import { handleServerResponse } from '../handleServerResponse';

export const useDeleteUser = (onSubmit: VoidFunction) => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: DeleteUserRequestVariables) => deleteUser(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/user'] });
      getUsers();
      onSubmit?.();
    },
    ...mapQueryOptions(tCommon)
  })();
};
