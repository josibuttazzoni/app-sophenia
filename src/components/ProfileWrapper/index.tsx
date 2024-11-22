import { useProfile } from '#lib/api/auth';

import LoadingWrapper from '../LoadingWrapper';
import { isUnauthorized } from './models';

type ProfileWrapperProps = {
  children: React.ReactNode;
  withProfileWrapper?: boolean;
};

export default function ProfileWrapper({ children, withProfileWrapper }: ProfileWrapperProps) {
  const { isFetching, data } = useProfile();
  const loading = (isFetching || !data || isUnauthorized(data)) && withProfileWrapper;
  return loading ? (
    <div className="flex h-screen w-full flex-row items-center justify-center">
      <LoadingWrapper loading={loading}>{children}</LoadingWrapper>
    </div>
  ) : (
    children
  );
}
