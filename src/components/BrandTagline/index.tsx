import Logo from '#assets/logo.svg';
import WhiteLogo from '#assets/whiteLogo.svg';

import { taglineVariants } from './styles';

interface BrandTaglineProps {
  className?: string;
  variant?: 'white' | 'dark';
}

export default function BrandTagline({ className, variant }: BrandTaglineProps) {
  return (
    <div className={taglineVariants({ variant, className })}>
      {/* TODO: check why it doesn't work poweredBy from /common.json */}
      Powered by SophenIA
      {variant === 'white' ? <WhiteLogo /> : <Logo />}
    </div>
  );
}
