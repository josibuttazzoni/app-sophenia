import { cx } from 'class-variance-authority';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

import glassIcon from '#assets/glass.png';
import BrandTagline from '#components/BrandTagline';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import { SIDEBAR_TABS } from './constants';

type SidebarProps = {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
};

export function Sidebar({ selectedTab, setSelectedTab }: SidebarProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  return (
    <div className="absolute left-0 top-0 flex h-full w-64 flex-col items-start bg-disco pt-10 text-white">
      <Image className="mx-4 mb-12" src={glassIcon} alt="Sophenia Logo" width={40} height={40} />
      <div className="flex w-full flex-col">
        {Object.values(SIDEBAR_TABS).map(tab => {
          const isSelected = selectedTab === tab;

          return (
            <Link
              href={`${tab}`}
              onClick={() => setSelectedTab(tab)}
              className={cx('cursor-pointer px-4 py-3 hover:opacity-50', isSelected && 'bg-maroon-flush')}
            >
              {t(tab)}
            </Link>
          );
        })}
      </div>
      <BrandTagline className="absolute bottom-4 px-4" variant="white" />
    </div>
  );
}
