import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import CrossIcon from '#assets/cross.svg';
import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import { EMPLOYEES_MOCK, WEATHER_ICONS, WEATHER_MOCK } from './mocks';

export default function GenerateTasksModal() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const [availableEmployees, setAvailableEmployees] = useState(EMPLOYEES_MOCK);
  return (
    <div className="flex flex-col justify-between">
      <div className="text-xl font-semibold">{t('generateTasks')}</div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row items-center gap-x-4">
          {t('availableEmployees')}
          <div className="rounded-full bg-disco px-4 text-white">{availableEmployees.length}</div>
        </div>
        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 p-2">
          {availableEmployees.map(empl => (
            <div className="bg-claret flex items-center gap-2 rounded-md bg-opacity-15 px-2 py-1 text-oxford-blue">
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
      <div className="flex flex-col gap-y-4">
        {t('weekWeather')}
        <div className="flex gap-x-3">
          {WEATHER_MOCK.map(({ day, min, max, weather }) => {
            const Icon = WEATHER_ICONS[weather];

            return (
              <div className="bg-claret flex w-14 flex-col items-center rounded-full bg-opacity-15 py-3 text-disco shadow-md">
                {day.slice(0, 1).toUpperCase()}
                <div className="flex h-10 items-center">
                  <Icon />
                </div>
                <span className="text-xs">{min.toString()}°</span> {max.toString()}°
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        {t('weeklyGoal')}
        <Input />
      </div>
      <div className="flex w-full justify-end">
        <Button className="px-12">{t('generate')}</Button>
      </div>
    </div>
  );
}
