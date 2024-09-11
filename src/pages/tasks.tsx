import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { Task } from 'src/types/tasks';

import emptyTasks from '#assets/emptyTasks.png';
import EmptyState from '#components/EmptyState';
import GenerateTasksModal from '#components/GenerateTasksModal';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import Table from '#components/Table';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

export default function Tasks() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);

  // TODO: change when back is ready
  // TODO: add logic for estimated time format
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      status: 'pending',
      time: '10hs',
      withDetail: false
    },
    {
      id: '2',
      title: 'Task 2',
      status: 'completed',
      time: '3hs',
      withDetail: false
    },
    {
      id: '3',
      title: 'Task 3',
      status: 'review',
      time: '2hs',
      withDetail: true
    }
  ];
  return (
    <Layout selectedTab={SIDEBAR_TABS.TASKS}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('tasks')}</div>
        <div className="flex gap-x-4">
          <Dialog>
            <DialogTrigger>
              <Button className="px-8" variant="secondary">
                {t('generateTasks')}
              </Button>
            </DialogTrigger>
            <DialogContent className="h-[600px] w-[850px] max-w-none rounded-xl bg-white p-8">
              <GenerateTasksModal />
            </DialogContent>
          </Dialog>

          <Button className="px-8" variant="primary">
            {t('generateOT')}
          </Button>
        </div>
      </div>
      <div className="h-full w-full rounded-lg bg-white p-6">
        {tasks.length > 0 ? (
          <Table sections={[t('task'), t('requiresDetail'), t('estimatedTime')]}>
            {tasks.map(task => (
              <tr key={task.id} className="h-16">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{task.title}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {tCommon(task.withDetail ? 'yes' : 'no')}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{task.time}</td>
              </tr>
            ))}
          </Table>
        ) : (
          <EmptyState title={t('emptyTasks')} icon={emptyTasks} />
        )}
      </div>
    </Layout>
  );
}
