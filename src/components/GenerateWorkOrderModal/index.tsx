import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import CrossIcon from '#assets/cross.svg';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import { EMPLOYEES_MOCK } from './mocks';

export default function GenerateWorkOrderModal() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const [availableEmployees, setAvailableEmployees] = useState(EMPLOYEES_MOCK);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center gap-x-4">
        {t('availableEmployees')}
        <div className="rounded-full bg-disco px-4 text-white">{availableEmployees.length}</div>
      </div>
      <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 p-2">
        {availableEmployees.map(empl => (
          <div
            key={empl}
            className="flex items-center gap-2 rounded-md bg-claret bg-opacity-15 px-2 py-1 text-oxford-blue"
          >
            {empl}
            <div
              onClick={() =>
                availableEmployees.length > 1 &&
                setAvailableEmployees(availableEmployees.filter(e => e !== empl))
              }
              className="cursor-pointer"
            >
              <CrossIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
