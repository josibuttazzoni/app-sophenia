import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { UpdateUserRequestVariables } from 'src/types/users';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { getUsers, updateUser } from '#lib/services/users';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useUpdateUser = (onSubmit?: VoidFunction) => {
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { t: tEmployees } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);
  return createMutation({
    mutationFn: (variables: { id: string; data: UpdateUserRequestVariables }) =>
      updateUser(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/user'] });
      onSubmit?.();
      getUsers();
    },
    ...mapQueryOptions(tCommon, tEmployees('updateUserError'))
  })();
};
