import { VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { ReactElement } from 'react';

import { buttonVariants } from './styles';

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonProps = {
  children: ReactElement;
  className?: string;
  onClick?: () => void;
  href?: string;
} & ButtonVariantProps;

export default function Button({
  children,
  onClick,
  className,
  variant,
  status = 'enabled',
  href
}: ButtonProps) {
  const Component = href ? Link : 'button';

  return (
    <Component className={buttonVariants({ variant, className, status })} onClick={onClick} href={href || ''}>
      {children}
    </Component>
  );
}
