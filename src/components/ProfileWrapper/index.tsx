import { useProfile } from '#lib/api/user';

import LoadingWrapper from '../LoadingWrapper';
import { isUnauthorized } from './models';

type ProfileWrapperProps = {
  children: React.ReactNode;
};

export default function ProfileWrapper({ children }: ProfileWrapperProps) {
  const { isFetching, data } = useProfile();
  const loading = isFetching || !data || isUnauthorized(data);
  return loading ? (
    <div className="flex h-screen w-full flex-row items-center justify-center">
      <LoadingWrapper loading={loading}>{children}</LoadingWrapper>
    </div>
  ) : (
    children
  );
}
