import useTranslation from 'next-translate/useTranslation';
import { WorkOrder } from 'src/types/workOrders';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

export default function WorkOrderModal({ startDate, endDate }: WorkOrder) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.HISTORY);

  return (
    <div className="flex flex-col items-center gap-y-5">
      <div className="text-md text-center font-semibold text-ebony-clay">{t('week')}</div>
      <div className="flex w-full justify-between gap-x-3">
        <span>{startDate.toLocaleDateString()}</span>
        <span>{endDate.toLocaleDateString()}</span>
      </div>
    </div>
  );
}
