import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Add from 'src/assets/plus.svg';
import { Backlog } from 'src/types/tasks';

import emptyTasks from '#assets/emptyTasks.png';
import GenerateTasksModal from '#components/GenerateTasksModal';
import { GenerateWorkOrderModal } from '#components/GenerateWorkOrderModal';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import PaginatedTableWrapper from '#components/Table';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { TableCell } from '#components/ui/table';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useBacklog } from '#lib/api/tasks/useBacklog';
import { useWorkers } from '#lib/api/users/useWorkers';
import { useProfile } from '#lib/hooks/user/useProfile';
import { TasksProvider } from '#lib/providers/TasksContext';
import { formatHoursTime } from '#utils/date/index';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

export default function Tasks() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);
  const { data: tasks, isFetching } = useBacklog();
  const { data: workers } = useWorkers();

  const loading = useProfile(tasks, isFetching);

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
              <Button onClick={() => setTasksModalOpen(true)} className="w-36 md:w-44" variant="secondary">
                <Add className="mr-2 h-4 w-4 text-disco" />
                {t('generateTasks')}
              </Button>
              <DialogContent
                setOpen={setTasksModalOpen}
                className="h-[700px] w-[850px] rounded-xl bg-white p-8"
              >
                <GenerateTasksModal setTasksModalOpen={setTasksModalOpen} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button className="w-36 md:w-44" variant="primary">
                  <Add className="mr-2 h-4 w-4 text-white" />
                  {t('generateOT')}
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[600px] w-[850px] rounded-xl bg-white p-8">
                {tasks && workers && <GenerateWorkOrderModal tasks={tasks} workers={workers} />}
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="h-full w-full rounded-lg bg-white px-8 pb-6 pt-4">
          <PaginatedTableWrapper
            data={tasks}
            loading={loading}
            columns={[t('task'), t('requiresDetail'), t('estimatedTime')]}
            row={renderTaskRow}
            emptyStateIcon={emptyTasks}
            emptyStateTitle={t('emptyTasks')}
          />
        </div>
      </Layout>
    </TasksProvider>
  );
}
