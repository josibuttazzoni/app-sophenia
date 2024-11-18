import { cx } from 'class-variance-authority';

import SpinnerSVG from '#assets/spinner.svg';

export type LoadingProps = {
  className?: string;
};

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={cx('flex h-full w-full flex-col items-center justify-center', className)}>
      <div className="animate-spin">
        <SpinnerSVG />
      </div>
    </div>
  );
}
