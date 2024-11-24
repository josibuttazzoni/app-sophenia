/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import useTranslation from 'next-translate/useTranslation';
import { UseFormReturn } from 'react-hook-form';
import { SuggestTasksVariables } from 'src/types/tasks';

import Stars from '#assets/stars.svg';
import CustomSelect from '#components/CustomSelect';
import LoadingWrapper from '#components/LoadingWrapper';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '#components/ui/form';
import { TextArea } from '#components/ui/textarea';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useRegionWeather } from '#lib/api/weather/useRegionWeather';
import { SeasonMoment } from '#lib/enums/tasks';

import { WEATHER_ICONS } from './mocks';

type GenerateTasksContentProps = {
  form: UseFormReturn<SuggestTasksVariables, any, undefined>;
  onSubmit: (data: SuggestTasksVariables) => void;
  suggestLoading: boolean;
};

export default function GenerateTasksContent({ form, onSubmit, suggestLoading }: GenerateTasksContentProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);

  const { data, isFetching } = useRegionWeather();

  const getDayName = (datetime: string) => {
    const date = new Date(`${datetime}T12:00:00Z`);
    return format(date, 'EEEE', { locale: es });
  };

  const { control, handleSubmit } = form;

  return (
    <LoadingWrapper loading={isFetching}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex h-full flex-col justify-between gap-y-3">
            <div className="text-xl font-semibold">{t('generateTasks')}</div>
            <div className="flex h-full flex-col gap-y-6">
              <div>
                <FormLabel>{t('weekWeather')}</FormLabel>
                <div className="flex gap-x-3 pt-3">
                  {data?.days.map(({ datetime, tempmax, tempmin, icon }) => {
                    const Icon = WEATHER_ICONS[icon];
                    return (
                      <div
                        key={datetime}
                        className="flex w-14 flex-col items-center rounded-full bg-claret bg-opacity-15 py-3 text-disco shadow-md"
                      >
                        {getDayName(datetime).slice(0, 1).toUpperCase()}
                        <div className="flex h-10 items-center">
                          <Icon />
                        </div>
                        <span className="text-xs">{tempmax.toString()}°</span> {tempmin.toString()}°
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
    </LoadingWrapper>
  );
}
