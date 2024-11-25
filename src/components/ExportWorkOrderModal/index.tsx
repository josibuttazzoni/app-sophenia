import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '#components/ui/button';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { getReportWorkOrder } from '#lib/services/reports';

import { DateRangePicker } from './DateRangePicker';

export const ExportWorkOrderModal = () => {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.HISTORY);

  const [date, setDate] = useState<DateRange | undefined>();
  const [errorDate, setErrorDate] = useState(false);

  const handleExport = async () => {
    if (date?.from && date?.to) {
      const response = await getReportWorkOrder(date.from, date.to);
      const url = window.URL.createObjectURL(new Blob([response as BlobPart]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-work-order-${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      setErrorDate(false);
    } else {
      setErrorDate(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center text-xl font-semibold">{t('exportReport')}</div>
      <DateRangePicker className="w-full" date={date} setDate={setDate} />
      <Button className="w-4/5 px-8" variant="primary" onClick={handleExport}>
        {t('export')}
      </Button>
      {errorDate && <p className="mt-2 text-xs text-red-600">{t('pickADate')}</p>}
    </div>
  );
};
