import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { DeleteUserRequestVariables } from 'src/types/users';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { queryClient } from '#lib/api';
import { deleteUser, getUsers } from '#lib/services/users';
import { mapQueryOptions } from '#utils/queries';

import { handleServerResponse } from '../handleServerResponse';

export const useDeleteUser = (onSubmit: VoidFunction) => {
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { t: tEmployees } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);
  return createMutation({
    mutationFn: (variables: DeleteUserRequestVariables) => deleteUser(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/user'] });
      getUsers();
      onSubmit?.();
    },
    ...mapQueryOptions(tCommon, tEmployees('deleteUserError'), tEmployees('deleteUserSuccess'))
  })();
};
