import { cx } from 'class-variance-authority';
import { deleteCookie } from 'cookies-next';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    deleteCookie(COOKIES.AUTH_TOKEN);
    deleteCookie(COOKIES.AUTH_ROLE);
    queryClient.clear();
    router.replace(PAGES_PATHS.LOGIN);
  };

  const closeMobile = () => setMobileOpen(false);

  const navContent = (
    <>
      <div className="flex w-full flex-col items-start">
        <Image className="mx-4 mb-8 lg:mb-12" src={glassIcon} alt="Sophenia Logo" width={40} height={40} />
        <div className="flex w-full flex-col">
          {Object.values(SIDEBAR_TABS).map(tab => {
            const isSelected = selectedTab === tab;

            return (
              <Link
                key={tab}
                href={`${tab}`}
                onClick={closeMobile}
                className={cx('cursor-pointer px-4 py-3 hover:opacity-50', isSelected && 'bg-maroon-flush')}
              >
                {t(tab)}
              </Link>
            );
          })}
        </div>
        <div className="my-6 w-11/12 self-center border-[0.5px] border-white lg:my-8" />
        <div
          className="flex w-full cursor-pointer flex-row items-center gap-x-3 px-4 py-3 hover:opacity-50"
          onClick={() => {
            handleLogout();
            closeMobile();
          }}
        >
          {tLogin('logout')}
          <Logout />
        </div>
      </div>
      <BrandTagline className="w-full justify-center" variant="white" />
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className={cx(
          'fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-disco text-white shadow-md lg:hidden',
          mobileOpen && 'invisible pointer-events-none'
        )}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={closeMobile}
        className={cx(
          'fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden',
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        )}
      />

      {/* Sidebar: drawer on mobile/tablet, fixed from lg */}
      <aside
        className={cx(
          'fixed top-0 left-0 z-40 flex h-full flex-col justify-between bg-disco pb-4 pt-10 text-white transition-transform duration-200 ease-out',
          'w-[280px] max-w-[85vw] lg:translate-x-0 lg:w-56',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          type="button"
          onClick={closeMobile}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        {navContent}
      </aside>
    </>
  );
}
