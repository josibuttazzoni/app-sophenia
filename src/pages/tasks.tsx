import useTranslation from 'next-translate/useTranslation';

import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

export default function Tasks() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  return (
    <Layout selectedTab={SIDEBAR_TABS.TASKS}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('tasks')}</div>
        <div className="flex gap-x-4">
          <Button className="px-8" variant="secondary">
            {t('generateTasks')}
          </Button>
          <Button className="px-8" variant="primary">
            {t('generateOT')}
          </Button>
        </div>
      </div>

      <div className="h-full w-full rounded-lg bg-white"></div>
    </Layout>
  );
}
