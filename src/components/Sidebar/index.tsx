import { cx } from 'class-variance-authority';
import useTranslation from 'next-translate/useTranslation';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import { SIDEBAR_TABS } from './constants';

type SidebarProps = {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
};

export function Sidebar({ selectedTab, setSelectedTab }: SidebarProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  return (
    <div className="absolute left-0 top-0 flex h-full w-64 flex-col bg-disco text-white">
      {Object.values(SIDEBAR_TABS).map(tab => {
        const isSelected = selectedTab === tab;

        return (
          <div
            onClick={() => setSelectedTab(tab)}
            className={cx('cursor-pointer p-4 hover:opacity-50', isSelected && 'bg-maroon-flush')}
          >
            {t(tab)}
          </div>
        );
      })}
    </div>
  );
}
