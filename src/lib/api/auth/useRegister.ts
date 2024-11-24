import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { RegisterRequestVariables } from 'src/types/auth';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { queryClient } from '#lib/api';
import { register } from '#lib/services/auth';
import { getUsers } from '#lib/services/users';
import { mapQueryOptions } from '#utils/queries';

import { handleServerResponse } from '../handleServerResponse';

export const useRegister = (onSubmit: VoidFunction) => {
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { t: tLogin } = useTranslation(TRANSLATIONS_NAMESPACES.LOGIN);
  return createMutation({
    mutationFn: (variables: RegisterRequestVariables) => register(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/user'] });
      getUsers();
      onSubmit();
    },
    ...mapQueryOptions(tCommon, tLogin('registerError'), tLogin('registerSuccess'))
  })();
};
