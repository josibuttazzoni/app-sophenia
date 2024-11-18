import { useEffect, useRef } from 'react';

import Loading from './components/Loading';

export type LoadingWrapperProps = {
  loading?: boolean;
  withInitialLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  loadingProps?: React.ComponentProps<typeof Loading>;
};

export default function LoadingWrapper({
  loading,
  children,
  withInitialLoading,
  className,
  loadingProps
}: LoadingWrapperProps) {
  const initialLoading = useRef(withInitialLoading);
  useEffect(() => {
    if (initialLoading.current && loading) {
      initialLoading.current = false;
    }
  }, [loading]);

  return initialLoading.current || loading ? (
    <Loading className={className} {...loadingProps} />
  ) : (
    <>{children}</>
  );
}
