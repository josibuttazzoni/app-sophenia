// import useTranslation from 'next-translate/useTranslation';
import { WorkOrder } from 'src/types/tasks';

export default function WorkOrderModal({ startDate, endDate }: WorkOrder) {
  return (
    <div className="flex flex-col items-center gap-y-5">
      <div className="text-md text-ebony-clay text-center font-semibold">Semana</div>
      <div className="flex w-full justify-between gap-x-3">
        <span>{startDate.toLocaleDateString()}</span>
        <span>{endDate.toLocaleDateString()}</span>
      </div>
    </div>
  );
}
