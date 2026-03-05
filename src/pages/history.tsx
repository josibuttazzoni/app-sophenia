import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Export from 'src/assets/export.svg';
import { WorkOrder } from 'src/types/workOrders';

import emptyEmployees from '#assets/emptyTasks.png';
import ExportWorkOrderModal from '#components/ExportWorkOrderModal';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import PaginatedTableWrapper from '#components/Table';
import WorkOrderModal from '#components/WorkOrderModal';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { TableCell } from '#components/ui/table';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useWorkOrders } from '#lib/api/workOrders';
import { useLoading } from '#lib/hooks/user/useLoading';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

export default function History() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.HISTORY);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const { data, isFetching } = useWorkOrders();

  const loading = useLoading(data, isFetching);

  const renderRow = (workOrder: WorkOrder) => {
    return (
      <>
        <TableCell className="font-medium">{workOrder.name}</TableCell>
        <TableCell className="font-medium">{workOrder.startDate}</TableCell>
        <TableCell className="font-medium">
          <Dialog>
            <DialogTrigger className="hover:underline">{t('viewDetail')}</DialogTrigger>
            <DialogContent fullScreenOnMobile className="w-full bg-white p-4 sm:max-w-sm sm:rounded-xl sm:p-8">
              <WorkOrderModal {...workOrder} />
            </DialogContent>
          </Dialog>
        </TableCell>
      </>
    );
  };

  return (
    <Layout selectedTab={SIDEBAR_TABS.HISTORY}>
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xl font-semibold sm:text-2xl">{t('history')}</div>
        <div className="w-full min-w-0 sm:w-auto">
          <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
            <DialogTrigger className="w-full sm:w-auto">
              <Button className="w-full px-4 sm:px-8" variant="primary">
                <Export className="mr-2 h-4 w-4 shrink-0 text-white" />
                {t('exportReport')}
              </Button>
            </DialogTrigger>
            <DialogContent fullScreenOnMobile className="rounded-xl bg-white p-4 sm:p-8">
              <ExportWorkOrderModal onSuccess={setExportModalOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="h-full min-w-0 w-full overflow-hidden rounded-lg bg-white px-2 pb-4 pt-4 sm:px-4 md:px-8 md:pb-6">
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
