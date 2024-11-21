import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Backlog } from 'src/types/tasks';

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
import { useBacklog } from '#lib/api/tasks/useBacklog';
import { TasksProvider } from '#lib/providers/TasksContext';
import { formatHoursTime } from '#utils/date/index';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

// TODO: add loading state

export default function Tasks() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { data: tasks } = useBacklog();

  const renderTaskRow = (task: Backlog) => {
    const { title, requiresTaskReport, estimatedHoursToComplete } = task;
    return (
      <>
        <TableCell className="font-medium">{title}</TableCell>
        <TableCell>{tCommon(requiresTaskReport ? 'yes' : 'no')}</TableCell>
        <TableCell>{formatHoursTime(estimatedHoursToComplete)}</TableCell>
      </>
    );
  };

  const [tasksModalOpen, setTasksModalOpen] = useState(false);

  return (
    <TasksProvider>
      <Layout selectedTab={SIDEBAR_TABS.TASKS}>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">{t('tasks')}</div>
          <div className="flex gap-x-4">
            <Dialog open={tasksModalOpen}>
              <Button onClick={() => setTasksModalOpen(true)} className="px-8" variant="secondary">
                {t('generateTasks')}
              </Button>
              <DialogContent
                setOpen={setTasksModalOpen}
                className="h-[700px] w-[850px] rounded-xl bg-white p-8"
              >
                <GenerateTasksModal setTasksModalOpen={setTasksModalOpen} />
              </DialogContent>
            </Dialog>

            <Button className="px-8" variant="primary">
              {t('generateOT')}
            </Button>
          </div>
        </div>
        <div className="h-full w-full rounded-lg bg-white p-6">
          {!!tasks && tasks.length > 0 ? (
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
    </TasksProvider>
  );
}
