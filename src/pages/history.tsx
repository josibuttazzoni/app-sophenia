import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { WorkOrder } from 'src/types/workOrders';

import emptyEmployees from '#assets/emptyTasks.png';
import EmptyState from '#components/EmptyState';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import PaginatedTableWrapper from '#components/Table';
import WorkOrderModal from '#components/WorkOrderModal';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
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
        _id: '1',
        data: {
          title: 'Tarea #1',
          description: 'Descripción de la tarea #1',
          status: 'completed',
          requiresTaskReport: true,
          estimatedHoursToComplete: 5,
          workerAssigned: {
            email: 'worker1@example.com',
            password: 'hashedPassword', // Nota: Evita almacenar contraseñas sin encriptar.
            fullname: 'Trabajador Uno',
            wineRole: 'Enólogo',
            roles: ['Role1', 'Role2'],
            status: 'active',
            _id: 'worker1'
          },
          rating: 4.5
        }
      },
      {
        _id: '2',
        data: {
          title: 'Tarea #2',
          description: 'Descripción de la tarea #2',
          status: 'completed',
          requiresTaskReport: true,
          estimatedHoursToComplete: 3,
          workerAssigned: {
            email: 'worker2@example.com',
            password: 'hashedPassword',
            fullname: 'Trabajador Dos',
            wineRole: 'Viticultor',
            roles: ['Role1', 'Role2'],
            status: 'active',
            _id: 'worker2'
          },
          rating: 4.0
        }
      },
      {
        _id: '3',
        data: {
          title: 'Tarea #3',
          description: 'Descripción de la tarea #3',
          status: 'completed',
          requiresTaskReport: false,
          estimatedHoursToComplete: 2,
          workerAssigned: {
            email: 'worker3@example.com',
            password: 'hashedPassword',
            fullname: 'Trabajador Tres',
            wineRole: 'Operario',
            roles: ['Role1'],
            status: 'inactive',
            _id: 'worker3'
          },
          rating: 3.8
        }
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
        _id: '4',
        data: {
          title: 'Tarea #4',
          description: 'Descripción de la tarea #4',
          status: 'completed',
          requiresTaskReport: true,
          estimatedHoursToComplete: 6,
          workerAssigned: {
            email: 'worker4@example.com',
            password: 'hashedPassword',
            fullname: 'Trabajador Cuatro',
            wineRole: 'Supervisor',
            roles: ['Role1', 'Role2', 'Role3'],
            status: 'active',
            _id: 'worker4'
          },
          rating: 4.7
        }
      },
      {
        _id: '5',
        data: {
          title: 'Tarea #5',
          description: 'Descripción de la tarea #5',
          status: 'completed',
          requiresTaskReport: false,
          estimatedHoursToComplete: 4,
          workerAssigned: {
            email: 'worker5@example.com',
            password: 'hashedPassword',
            fullname: 'Trabajador Cinco',
            wineRole: 'Asistente',
            roles: ['Role1'],
            status: 'active',
            _id: 'worker5'
          },
          rating: 4.2
        }
      }
    ]
  }
];

export default function History() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.HISTORY);
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);

  const renderRow = (workOrder: WorkOrder) => {
    return (
      <>
        <TableCell className="font-medium">{workOrder.id}</TableCell>
        <TableCell className="font-medium">{workOrder.startDate.toLocaleDateString()}</TableCell>
        <TableCell className="font-medium">{workOrder.endDate.toLocaleDateString()}</TableCell>
        <TableCell className="font-medium">{workOrder.name}</TableCell>
        <TableCell className="font-medium">
          <Dialog>
            <DialogTrigger>{tCommon('seeMore')}</DialogTrigger>
            <DialogContent className="w-full max-w-sm rounded-xl bg-white p-8">
              <WorkOrderModal {...workOrder} />
            </DialogContent>
          </Dialog>
        </TableCell>
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
