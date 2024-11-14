import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { Task } from 'src/types/tasks';

import emptyTasks from '#assets/emptyTasks.png';
import EmptyState from '#components/EmptyState';
import GenerateTasksModal from '#components/GenerateTasksModal';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import PaginatedTableWrapper from '#components/Table';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { TableCell } from '#components/ui/table';
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
    },
    {
      id: '4',
      title: 'Task 4',
      status: 'pending',
      time: '10hs',
      withDetail: false
    },
    {
      id: '5',
      title: 'Task 5',
      status: 'completed',
      time: '3hs',
      withDetail: false
    },
    {
      id: '6',
      title: 'Task 6',
      status: 'review',
      time: '2hs',
      withDetail: true
    },
    {
      id: '7',
      title: 'Task 7',
      status: 'pending',
      time: '10hs',
      withDetail: false
    },
    {
      id: '8',
      title: 'Task 8',
      status: 'completed',
      time: '3hs',
      withDetail: false
    },
    {
      id: '9',
      title: 'Task 9',
      status: 'review',
      time: '2hs',
      withDetail: true
    }
  ];

  const renderTaskRow = (task: Task) => {
    return (
      <>
        <TableCell className="font-medium">{task.title}</TableCell>
        <TableCell>{tCommon(task.withDetail ? 'yes' : 'no')}</TableCell>
        <TableCell>{task.time}</TableCell>
      </>
    );
  };
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
            <DialogContent className="h-[600px] w-[850px] rounded-xl bg-white p-8">
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
          <PaginatedTableWrapper
            data={tasks}
            columns={[t('task'), t('requiresDetail'), t('estimatedTime')]}
            row={renderTaskRow}
          />
        ) : (
          <EmptyState title={t('emptyTasks')} icon={emptyTasks} />
        )}
      </div>
    </Layout>
  );
}
