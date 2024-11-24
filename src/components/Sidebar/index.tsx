import { cx } from 'class-variance-authority';
import { deleteCookie } from 'cookies-next';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import glassIcon from '#assets/glass.png';
import Logout from '#assets/logout.svg';
import BrandTagline from '#components/BrandTagline';
import { COOKIES } from '#constants/cookies';
import { PAGES_PATHS } from '#constants/pages';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { queryClient } from '#lib/api';

import { SIDEBAR_TABS } from './constants';

type SidebarProps = {
  selectedTab: string;
};

export function Sidebar({ selectedTab }: SidebarProps) {
  const router = useRouter();
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { t: tLogin } = useTranslation(TRANSLATIONS_NAMESPACES.LOGIN);

  const handleLogout = () => {
    deleteCookie(COOKIES.AUTH_TOKEN);
    deleteCookie(COOKIES.AUTH_ROLE);
    queryClient.clear();
    router.replace(PAGES_PATHS.LOGIN);
  };

  return (
    <div className="fixed flex h-full w-1/6 flex-col items-start justify-between bg-disco pb-4 pt-10 text-white">
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
        <div
          className="flex w-full cursor-pointer flex-row items-center gap-x-3 px-4 py-3 hover:opacity-50"
          onClick={handleLogout}
        >
          {tLogin('logout')}
          <Logout />
        </div>
      </div>
      <BrandTagline className="w-full justify-center" variant="white" />
    </div>
  );
}
