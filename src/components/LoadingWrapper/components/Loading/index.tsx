import { cx } from 'class-variance-authority';

import SpinnerWhite from '#assets/spinner-white.svg';
import SpinnerSVG from '#assets/spinner.svg';

export type LoadingProps = {
  className?: string;
  white?: boolean;
};

export default function Loading({ className, white }: LoadingProps) {
  return (
    <div className={cx('flex h-full w-full flex-col items-center justify-center', className)}>
      <div className="animate-spin">{white ? <SpinnerWhite /> : <SpinnerSVG />}</div>
    </div>
  );
}
