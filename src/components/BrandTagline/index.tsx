import useTranslation from 'next-translate/useTranslation';

import Logo from '#assets/logo.svg';
import WhiteLogo from '#assets/white-logo.svg';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import { taglineVariants } from './styles';

interface BrandTaglineProps {
  className?: string;
  variant?: 'white' | 'dark';
}

export default function BrandTagline({ className, variant }: BrandTaglineProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);

  return (
    <div className={taglineVariants({ variant, className })}>
      {t('poweredBy')}
      {variant === 'white' ? <WhiteLogo /> : <Logo />}
    </div>
  );
}
