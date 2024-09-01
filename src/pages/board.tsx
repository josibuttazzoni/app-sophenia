import useTranslation from 'next-translate/useTranslation';

import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import Layout from '#components/layout';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

export default function Board() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.BOARD);
  return (
    <Layout selectedTab={SIDEBAR_TABS.BOARD}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('board')}</div>
      </div>

      <div className="h-full w-full rounded-lg bg-white"></div>
    </Layout>
  );
}
