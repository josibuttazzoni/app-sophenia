import useTranslation from 'next-translate/useTranslation';

import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import Layout from '#components/layout';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

export default function History() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.HISTORY);
  return (
    <Layout selectedTab={SIDEBAR_TABS.HISTORY}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('history')}</div>
      </div>

      <div className="h-full w-full rounded-lg bg-white"></div>
    </Layout>
  );
}
