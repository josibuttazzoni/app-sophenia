import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { RegisterRequestVariables } from 'src/types/auth';

import { queryClient } from '#lib/api';
import { register } from '#lib/services/auth';
import { mapQueryOptions } from '#utils/queries';

import { handleServerResponse } from '../handleServerResponse';

export const useRegister = () => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (variables: RegisterRequestVariables) => register(variables).then(handleServerResponse),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/auth/register'] });
    },
    ...mapQueryOptions(tCommon)
  })();
};
