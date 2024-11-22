import { isUnauthorized } from '#components/ProfileWrapper/models';
import { useProfile as getProfile } from '#lib/api/auth';

export const useProfile = (pageData: unknown, isPageFetching?: boolean) => {
  const { isFetching, data } = getProfile();
  const loadingProfile = isFetching || !data || isUnauthorized(data);
  const loadingPage = isPageFetching || !pageData;

  return loadingProfile || loadingPage;
};
