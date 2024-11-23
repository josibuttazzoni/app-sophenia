import { addDays } from 'date-fns';
import React from 'react';
import { DateRange } from 'react-day-picker';

import { getReportWorkOrder } from '#lib/services/reports';

import { DateRangePicker } from './DateRangePicker';

export const ExportWorkOrderModal = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20)
  });

  const handleExport = async () => {
    if (date?.from && date?.to) {
      const response = await getReportWorkOrder(date.from, date.to);
      const url = window.URL.createObjectURL(new Blob([response as BlobPart]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-work-order.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } else {
      console.error('Date range is not fully defined');
    }
  };

  return (
    <div>
      <DateRangePicker date={date} setDate={setDate} />
      <button onClick={handleExport}>Exportar</button>
    </div>
  );
};
