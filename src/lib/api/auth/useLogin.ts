import { setCookie } from 'cookies-next';
import useTranslation from 'next-translate/useTranslation';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { createMutation } from 'react-query-kit';
import { LoginRequestVariables } from 'src/types/auth';

import { COOKIES } from '#constants/cookies';
import { REDIRECT_TO } from '#constants/login';
import { PAGES_PATHS } from '#constants/pages';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { RoleDto } from '#lib/enums/employees';
import { login } from '#lib/services/auth';
import { setAuthHeader } from '#utils/api';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useLogin = (role: RoleDto) => {
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { t: tLogin } = useTranslation(TRANSLATIONS_NAMESPACES.LOGIN);
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get(REDIRECT_TO);
  const redirectTo = redirectParam ? redirectParam : getRedirectPageByRole(role);
  const router = useRouter();
  return createMutation({
    mutationFn: ({ email, password, role }: LoginRequestVariables) =>
      login({ email, password, role })?.then(handleServerResponse),
    onSettled: data => {
      if (!data) return;
      setAuthHeader(data?.access_token || '');
      setCookie(COOKIES.AUTH_TOKEN, data?.access_token || '');
      setCookie(COOKIES.AUTH_ROLE, role);
      queryClient.clear();
      router.push(redirectTo);
    },
    ...mapQueryOptions(tCommon, tLogin('loginError'))
  })();
};

export const getRedirectPageByRole = (role: RoleDto) =>
  ({
    [RoleDto.ADMIN]: PAGES_PATHS.BOARD,
    [RoleDto.WORKER]: PAGES_PATHS.WORKERS_TASKS
  })[role];
