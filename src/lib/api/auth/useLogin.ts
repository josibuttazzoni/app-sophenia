import { setCookie } from 'cookies-next';
import useTranslation from 'next-translate/useTranslation';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { createMutation } from 'react-query-kit';
import { LoginRequestVariables } from 'src/types/auth';

import { COOKIES } from '#constants/cookies';
import { REDIRECT_TO } from '#constants/login';
import { PAGES_PATHS } from '#constants/pages';
import { login } from '#lib/services/auth';
import { setAuthHeader } from '#utils/api';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useLogin = () => {
  const { t: tCommon } = useTranslation('common');
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get(REDIRECT_TO);
  const redirectTo = redirectParam ? redirectParam : PAGES_PATHS.TASKS;
  const router = useRouter();
  return createMutation({
    mutationFn: ({ email, password }: LoginRequestVariables) =>
      // TODO: delete default value
      login({ email, password, role: 'ADMIN' })?.then(handleServerResponse),
    onSettled: data => {
      if (!data) return;
      setAuthHeader(data?.access_token || '');
      setCookie(COOKIES.AUTH_TOKEN, data?.access_token || '');
      queryClient.clear();
      router.push(redirectTo);
    },
    ...mapQueryOptions(tCommon)
  })();
};
