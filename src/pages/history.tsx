import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Export from 'src/assets/export.svg';
import { WorkOrder } from 'src/types/workOrders';

import emptyEmployees from '#assets/emptyTasks.png';
import { ExportWorkOrderModal } from '#components/ExportWorkOrderModal';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import PaginatedTableWrapper from '#components/Table';
import WorkOrderModal from '#components/WorkOrderModal';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { TableCell } from '#components/ui/table';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useWorkOrders } from '#lib/api/workOrders';
import { useProfile } from '#lib/hooks/user/useProfile';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

export default function History() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.HISTORY);

  const { data, isFetching } = useWorkOrders();

  const loading = useProfile(data, isFetching);

  const renderRow = (workOrder: WorkOrder) => {
    return (
      <>
        <TableCell className="font-medium">{workOrder.name}</TableCell>
        <TableCell className="font-medium">{workOrder.startDate}</TableCell>
        <TableCell className="font-medium">
          <Dialog>
            <DialogTrigger className="hover:underline">{t('viewDetail')}</DialogTrigger>
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
                <Export className="mr-2 h-4 w-4 text-white" />
                {t('exportReport')}
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl bg-white p-8">
              <ExportWorkOrderModal />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="h-full w-full rounded-lg bg-white px-8 pb-6 pt-4">
        <PaginatedTableWrapper
          emptyStateIcon={emptyEmployees}
          loading={loading}
          emptyStateTitle={t('emptyHistory')}
          data={data}
          columns={[t('name'), t('date')]}
          row={renderRow}
        />
      </div>
    </Layout>
  );
}
