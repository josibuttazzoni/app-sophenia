import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { WorkOrder } from 'src/types/tasks';

import emptyEmployees from '#assets/emptyTasks.png';
import EmptyState from '#components/EmptyState';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import PaginatedTableWrapper from '#components/Table';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog } from '#components/ui/dialog';
import { TableCell } from '#components/ui/table';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

// TODO: delete when back is ready
const history: WorkOrder[] = [
  {
    id: '2403940',
    name: 'Orden de trabajo #1',
    startDate: new Date('2024-05-10'),
    endDate: new Date(),
    tasks: [
      {
        id: '1',
        title: 'Tarea #1',
        status: 'completed',
        time: '10:00',
        withDetail: true
      },
      {
        id: '2',
        title: 'Tarea #2',
        status: 'completed',
        time: '10:00',
        withDetail: true
      },
      {
        id: '3',
        title: 'Tarea #3',
        status: 'completed',
        time: '10:00',
        withDetail: true
      }
    ]
  },
  {
    id: '5243841',
    name: 'Orden de trabajo #2',
    startDate: new Date('2024-03-10'),
    endDate: new Date(),
    tasks: [
      {
        id: '1',
        title: 'Tarea #1',
        status: 'completed',
        time: '10:00',
        withDetail: true
      },
      {
        id: '2',
        title: 'Tarea #2',
        status: 'completed',
        time: '10:00',
        withDetail: true
      },
      {
        id: '3',
        title: 'Tarea #3',
        status: 'completed',
        time: '10:00',
        withDetail: true
      }
    ]
  }
];

export default function Employees() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.HISTORY);

  const renderRow = (workOrder: WorkOrder) => {
    return (
      <>
        <TableCell className="font-medium">{workOrder.id}</TableCell>
        <TableCell className="font-medium">{workOrder.startDate.toLocaleDateString()}</TableCell>
        <TableCell className="font-medium">{workOrder.endDate.toLocaleDateString()}</TableCell>
        <TableCell className="font-medium">{workOrder.name}</TableCell>
      </>
    );
  };

  return (
    <Layout selectedTab={SIDEBAR_TABS.HISTORY}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('history')}</div>
        <div className="flex gap-x-4">
          <Dialog>
            <DialogTrigger>
              <Button className="px-8" variant="primary">
                {t('exportReport')}
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
      <div className="h-full w-full rounded-lg bg-white p-6">
        {history.length > 0 ? (
          <PaginatedTableWrapper
            data={history}
            columns={[t('ID'), t('startDate'), t('endDate'), t('name')]}
            row={renderRow}
          />
        ) : (
          <EmptyState title={t('emptyHistory')} icon={emptyEmployees} />
        )}
      </div>
    </Layout>
  );
}
