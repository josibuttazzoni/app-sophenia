import { useRouter } from 'next/router';

import { PAGES_PATHS } from '#constants/pages';

export const useLoginRedirect = () => {
  const router = useRouter();
  const loginRedirect = () => {
    router.replace(PAGES_PATHS.LOGIN);
  };
  return loginRedirect;
};
