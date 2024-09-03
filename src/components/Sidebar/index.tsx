import { cx } from 'class-variance-authority';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

import glassIcon from '#assets/glass.png';
import Logout from '#assets/logout.svg';
import BrandTagline from '#components/BrandTagline';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import { SIDEBAR_TABS } from './constants';

type SidebarProps = {
  selectedTab: string;
};

export function Sidebar({ selectedTab }: SidebarProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { t: tLogin } = useTranslation(TRANSLATIONS_NAMESPACES.LOGIN);

  return (
    <div className="flex h-full w-80 flex-col items-start justify-between bg-disco pb-4 pt-10 text-white">
      <div className="flex w-full flex-col items-start">
        <Image className="mx-4 mb-12" src={glassIcon} alt="Sophenia Logo" width={40} height={40} />
        <div className="flex w-full flex-col">
          {Object.values(SIDEBAR_TABS).map(tab => {
            const isSelected = selectedTab === tab;

            return (
              <Link
                key={tab}
                href={`${tab}`}
                className={cx('cursor-pointer px-4 py-3 hover:opacity-50', isSelected && 'bg-maroon-flush')}
              >
                {t(tab)}
              </Link>
            );
          })}
        </div>
        <div className="my-8 w-11/12 self-center border-[0.5px] border-white" />
        <Link
          href="/logout"
          className="flex w-full cursor-pointer flex-row items-center gap-x-3 px-4 py-3 hover:opacity-50"
        >
          {tLogin('logout')}
          <Logout />
        </Link>
      </div>
      <BrandTagline className="w-full justify-center" variant="white" />
    </div>
  );
}
