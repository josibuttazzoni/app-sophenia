/* eslint-disable @typescript-eslint/no-explicit-any */
import useTranslation from 'next-translate/useTranslation';
import { UseFormReturn, useForm } from 'react-hook-form';
import { Backlog, SuggestTasksVariables } from 'src/types/tasks';

import Stars from '#assets/stars.svg';
import CustomSelect from '#components/CustomSelect';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '#components/ui/form';
import { TextArea } from '#components/ui/textarea';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { SeasonMoment } from '#lib/enums/tasks';

import { WEATHER_ICONS, WEATHER_MOCK } from './mocks';

type GenerateTasksContentProps = {
  form: UseFormReturn<SuggestTasksVariables, any, undefined>;
  onSubmit: (data: SuggestTasksVariables) => void;
  suggestLoading: boolean;
};

export default function GenerateTasksContent({ form, onSubmit, suggestLoading }: GenerateTasksContentProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);

  const { control, handleSubmit } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-full flex-col justify-between gap-y-3">
          <div className="text-xl font-semibold">{t('generateTasks')}</div>
          <div className="flex h-full flex-col gap-y-6">
            <div>
              <FormLabel>{t('weekWeather')}</FormLabel>
              <div className="flex gap-x-3 pt-3">
                {WEATHER_MOCK.map(({ day, min, max, weather }) => {
                  const Icon = WEATHER_ICONS[weather];
                  return (
                    <div
                      key={day}
                      className="flex w-14 flex-col items-center rounded-full bg-claret bg-opacity-15 py-3 text-disco shadow-md"
                    >
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
            <FormField
              control={control}
              name="seasonMoment"
              render={({ field }) => (
                <CustomSelect
                  className="pt-3"
                  label={t('seasonMoment')}
                  items={Object.values(SeasonMoment).map(value => ({ label: t(value), value }))}
                  placeholder={t('seasonMoment')}
                  value={field.value as any}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              control={control}
              rules={{ required: t('required') }}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextArea
                      className="pt-3"
                      label={t('weeklyGoal')}
                      placeholder={t('enterThe', { field: t('weeklyGoal').toLowerCase() })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-end">
            <Button
              status={suggestLoading ? 'pending' : 'enabled'}
              type="submit"
              className="flex gap-x-3 px-12"
            >
              {t('generate')}
              <Stars />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
