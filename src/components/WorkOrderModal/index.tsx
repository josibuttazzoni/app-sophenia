import useTranslation from 'next-translate/useTranslation';
import { WorkOrder } from 'src/types/workOrders';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

export default function WorkOrderModal({ name, startDate, tasks }: WorkOrder) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.HISTORY);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="mb-4 text-center text-xl font-semibold">{name}</div>
      <div className="flex w-full justify-between">
        <div className="text-md text-center font-semibold text-disco">{t('date')}</div>
        <span>{startDate}</span>
      </div>
      <div className="text-md font-semibold text-disco">{t('tasksDone')}</div>
      <div className="flex w-full flex-col rounded-lg bg-oxford-blue bg-opacity-5 p-2">
  <ul className="list-disc max-h-80 overflow-y-auto pl-5">
    {tasks.map(task => (
      <li className="my-1 text-sm font-medium text-black/70" key={task.id}>
        {task.title}
      </li>
    ))}
  </ul>
</div>

    </div>
  );
}
