import { cx } from 'class-variance-authority';

import Spinner from '#assets/small-spinner.svg';
import SpinnerSVG from '#assets/spinner.svg';

export type LoadingProps = {
  className?: string;
  white?: boolean;
  small?: boolean;
};

export default function Loading({ className, white, small }: LoadingProps) {
  return (
    <div className={cx('flex h-full w-full flex-col items-center justify-center', className)}>
      {small ? (
        <div className={`${white ? 'text-white' : 'text-disco'}`}>
          <Spinner className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="animate-spin">
          <SpinnerSVG />
        </div>
      )}
    </div>
  );
}
